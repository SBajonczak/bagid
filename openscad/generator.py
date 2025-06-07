#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse
import csv
import uuid
from pathlib import Path

def validate_uuid(uuid_string):
    """Validate if a string is a valid UUID format"""
    try:
        uuid_obj = uuid.UUID(uuid_string)
        return str(uuid_obj)
    except ValueError:
        return None

def read_guids_from_file(file_path):
    """Read GUIDs from a file, one per line or from a CSV"""
    guids = []
    file_ext = os.path.splitext(file_path)[1].lower()
    
    try:
        if file_ext == '.csv':
            with open(file_path, 'r') as csv_file:
                reader = csv.reader(csv_file)
                for row in reader:
                    if row and row[0].strip():
                        uuid_str = validate_uuid(row[0].strip())
                        if uuid_str:
                            guids.append(uuid_str)
        else:
            with open(file_path, 'r') as txt_file:
                for line in txt_file:
                    if line.strip():
                        uuid_str = validate_uuid(line.strip())
                        if uuid_str:
                            guids.append(uuid_str)
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return []
    
    return guids

def run_openscad(scad_file, output_file, qr_url):
    """Run OpenSCAD to generate a 3D model with the given QR URL"""
    cmd = [
        "D:\Program Files (x86)\OpenSCAD\openscad",
        "-o", output_file,
        "-D", f"Text=\"{qr_url}\"",
        "-D", "QR_ACTION=\"URL\"",
        scad_file
    ]
    
    print(f"Running: {' '.join(cmd)}")
    subprocess.run(cmd, check=True)

def generate_tag(guid, base_url, scad_file, output_dir, output_format="stl"):
    """Generate a tag with QR code for a specific GUID"""
    url = f"{base_url}/{guid}"
    output_file = os.path.join(output_dir, f"tag_{guid}.{output_format}")
    
    print(f"Generating tag for GUID: {guid}")
    print(f"URL: {url}")
    print(f"Output file: {output_file}")
    
    try:
        run_openscad(scad_file, output_file, url)
        print(f"Successfully created tag: {output_file}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error generating tag: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Generate luggage tags with QR codes")
    parser.add_argument("--guids", help="File containing list of GUIDs (one per line or CSV)")
    parser.add_argument("--base-url", default="https://bag-tag.de", help="Base URL for QR codes")
    parser.add_argument("--scad-file", default="tag-medium.scad", help="OpenSCAD file to use")
    parser.add_argument("--output-dir", default=".", help="Directory to save output files")
    parser.add_argument("--format", default="stl", choices=["stl", "3mf", "amf", "off", "dxf", "svg", "csg"], 
                      help="Output file format")
    parser.add_argument("--manual-guids", help="Comma-separated list of GUIDs to process")
    
    args = parser.parse_args()
    
    # Create output directory if it doesn't exist
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Resolve paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    scad_file = os.path.join(script_dir, args.scad_file)
    
    # Ensure the SCAD file exists
    if not os.path.exists(scad_file):
        print(f"Error: SCAD file not found: {scad_file}")
        return 1
    
    guids = []
    
    # Try to get GUIDs from file if provided
    if args.guids and os.path.exists(args.guids):
        guids = read_guids_from_file(args.guids)
    
    # Add manually specified GUIDs if provided
    if args.manual_guids:
        for guid_str in args.manual_guids.split(','):
            uuid_str = validate_uuid(guid_str.strip())
            if uuid_str and uuid_str not in guids:
                guids.append(uuid_str)
    
    # Example GUIDs if none provided
    if not guids:
        print("No valid GUIDs provided, using example GUIDs")
        guids = [
            "5b1a3384-0d14-43bc-b613-a1778413c65c",
            "8c9e2fb0-8a7a-4c62-9d7f-193a8d30d0cc"
        ]
    
    # Generate tags for each GUID
    successful = 0
    for guid in guids:
        if generate_tag(
            guid, 
            args.base_url, 
            scad_file,
            args.output_dir,
            args.format
        ):
            successful += 1
    
    print(f"\nProcessing complete. Successfully generated {successful} out of {len(guids)} tags.")
    return 0

if __name__ == "__main__":
    sys.exit(main())

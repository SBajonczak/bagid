#!/usr/bin/env python3
import os
import sys
import subprocess
import argparse
import csv
import uuid
from pathlib import Path

# Konfigurationsvariablen
OPENSCAD_PATH = r"D:\Program Files (x86)\OpenSCAD\openscad"  # Pfad zur OpenSCAD-Executable
BASE_URL = "https://bag-tag.de"  # Basis-URL für QR-Codes
SQL_TEMPLATE = """INSERT INTO TravelTag (
    tagId,
    hasData,

    ownerFirstName,
    ownerLastName,
    ownerAddress,
    ownerEmail,
    ownerMobile,
    ownerLandline,
    ownerOther,

    guideFirstName,
    guideLastName,
    guideEmail,
    guideMobile,
    guideLandline,

    destinationAccommodation,
    destinationAddress,
    transportation,
    transportationNumber,
    transportationDate
) VALUES (
    '{guid}',
    0,

    '',
    '',
    '',
    '',
    '',
    '',
    '',

    '',
    '',
    '',
    '',
    '',

    '',
    '',
    '',
    '',
    ''
);
"""

def generate_new_guid():
    """Generate a new random UUID"""
    return str(uuid.uuid4())

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
        OPENSCAD_PATH,
        "-o", output_file,
        "-D", f"Text=\"{qr_url}\"",
        "-D", "QR_ACTION=\"URL\"",
        scad_file
    ]
    
    print(f"Running: {' '.join(cmd)}")
    subprocess.run(cmd, check=True)

def generate_sql_insert(guid):
    """Generate SQL INSERT statement for a GUID"""
    return SQL_TEMPLATE.format(guid=guid)

def write_sql_to_file(sql_statement, sql_file):
    """Write or append SQL statement to a file"""
    mode = 'a' if os.path.exists(sql_file) else 'w'
    with open(sql_file, mode, encoding='utf-8') as f:
        f.write(sql_statement)
        f.write("\n\n")  # Add some spacing between statements

def generate_tag(guid, base_url, scad_file, output_dir, output_format="3mf", sql_file=None):
    """Generate a tag with QR code for a specific GUID"""
    url = f"{base_url}/{guid}"
    output_file = os.path.join(output_dir, f"tag_{guid}.{output_format}")
    
    print(f"Generating tag for GUID: {guid}")
    print(f"URL: {url}")
    print(f"Output file: {output_file}")
    
    try:
        run_openscad(scad_file, output_file, url)
        print(f"Successfully created tag: {output_file}")
        
        # Generate and write SQL insert statement if sql_file is provided
        if sql_file:
            sql_statement = generate_sql_insert(guid)
            write_sql_to_file(sql_statement, sql_file)
            print(f"SQL insert statement for {guid} added to {sql_file}")
            
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error generating tag: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Generate luggage tags with QR codes")
    parser.add_argument("--guids", help="File containing list of GUIDs (one per line or CSV)")
    parser.add_argument("--base-url", default=BASE_URL, help=f"Base URL for QR codes (default: {BASE_URL})")
    parser.add_argument("--scad-file", default="tag-medium.scad", help="OpenSCAD file to use")
    parser.add_argument("--output-dir", default=".", help="Directory to save output files")
    parser.add_argument("--format", default="3mf", choices=["stl", "3mf", "amf", "off", "dxf", "svg", "csg"], 
                      help="Output file format (default: 3mf)")
    parser.add_argument("--manual-guids", help="Comma-separated list of GUIDs to process")
    parser.add_argument("--count", type=int, default=1, help="Number of new GUIDs to generate (if no GUIDs provided)")
    parser.add_argument("--sql-file", help="File to write SQL INSERT statements")
    
    args = parser.parse_args()
    
   
    
    # Create output directory if it doesn't exist
    os.makedirs(args.output_dir, exist_ok=True)
    
    # Resolve paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    scad_file = os.path.join(script_dir, args.scad_file)
    
    # Default SQL file path if not provided
    sql_file = args.sql_file
    if not sql_file:
        sql_file = os.path.join(args.output_dir, "tag_inserts.sql")
    
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
    
    # If no GUIDs provided or found, generate new ones
    if not guids:
        print(f"No GUIDs provided, generating {args.count} new GUIDs.")
        for _ in range(args.count):
            new_guid = generate_new_guid()
            guids.append(new_guid)
    
    # Save generated GUIDs to a file for reference
    if not args.guids and not args.manual_guids:
        guid_file_path = os.path.join(args.output_dir, "generated_guids.txt")
        with open(guid_file_path, 'w') as f:
            for guid in guids:
                f.write(f"{guid}\n")
        print(f"Generated GUIDs saved to {guid_file_path}")
    
    # Generate tags for each GUID
    successful = 0
    for guid in guids:
        if generate_tag(
            guid, 
            args.base_url, 
            scad_file,
            args.output_dir,
            args.format,
            sql_file
        ):
            successful += 1
    
    print(f"\nProcessing complete. Successfully generated {successful} out of {len(guids)} tags.")
    print(f"All tags were exported in {args.format.upper()} format.")
    
    if successful > 0:
        print(f"SQL INSERT statements written to {sql_file}")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

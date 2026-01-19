#!/usr/bin/env node
/**
 * Architecture Validation Script
 * Verifies that the three-mode architecture is correctly implemented
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Three-Mode Architecture...\n');

let allPassed = true;

// Test 1: Core business logic has no framework imports
console.log('Test 1: Core business logic is framework-agnostic');
const coreServicePath = path.join(__dirname, 'src/core/tag.service.ts');
const coreServiceContent = fs.readFileSync(coreServicePath, 'utf8');

const hasExpressImport = coreServiceContent.includes("from 'express'") || 
                         coreServiceContent.includes('from "express"');
const hasNextImport = coreServiceContent.includes("from 'next") || 
                      coreServiceContent.includes('from "next');

if (hasExpressImport || hasNextImport) {
  console.log('❌ FAIL: Core service has framework imports');
  allPassed = false;
} else {
  console.log('✅ PASS: Core service is framework-agnostic');
}

// Test 2: Express adapter exists and imports core service
console.log('\nTest 2: Express adapter exists and uses core service');
const expressAdapterPath = path.join(__dirname, 'src/adapters/express/tag.routes.ts');
const expressAdapterContent = fs.readFileSync(expressAdapterPath, 'utf8');

const expressImportsCore = expressAdapterContent.includes('../../core/tag.service');
const expressImportsExpress = expressAdapterContent.includes("from 'express'") || 
                              expressAdapterContent.includes('from "express"');

if (expressImportsCore && expressImportsExpress) {
  console.log('✅ PASS: Express adapter properly imports core service and Express');
} else {
  console.log('❌ FAIL: Express adapter missing required imports');
  allPassed = false;
}

// Test 3: Next.js API route exists and imports core service
console.log('\nTest 3: Next.js API route exists and uses core service');
const nextRoutePath = path.join(__dirname, 'app/api/tags/[tagId]/route.ts');
const nextRouteContent = fs.readFileSync(nextRoutePath, 'utf8');

const nextImportsCore = nextRouteContent.includes('@/core/tag.service') || 
                        nextRouteContent.includes('from ../../../../src/core/tag.service');
const nextImportsNext = nextRouteContent.includes("from 'next/server'") || 
                        nextRouteContent.includes('from "next/server"');

if (nextImportsCore && nextImportsNext) {
  console.log('✅ PASS: Next.js route properly imports core service');
} else {
  console.log('❌ FAIL: Next.js route missing required imports');
  allPassed = false;
}

// Test 4: Server.ts exists and bootstraps Express
console.log('\nTest 4: Express server bootstrap exists');
const serverPath = path.join(__dirname, 'server.ts');
const serverExists = fs.existsSync(serverPath);

if (serverExists) {
  const serverContent = fs.readFileSync(serverPath, 'utf8');
  const hasExpressSetup = serverContent.includes('express()') && 
                          serverContent.includes('.listen(');
  const hasDotenv = serverContent.includes('dotenv');
  
  if (hasExpressSetup && hasDotenv) {
    console.log('✅ PASS: Express server properly configured');
  } else {
    console.log('❌ FAIL: Express server missing required setup');
    allPassed = false;
  }
} else {
  console.log('❌ FAIL: server.ts not found');
  allPassed = false;
}

// Test 5: Dockerfile exists and runs both servers
console.log('\nTest 5: Dockerfile configured for dual-mode');
const dockerfilePath = path.join(__dirname, 'Dockerfile');
const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8');

const hasNextjsProgram = dockerfileContent.includes('[program:nextjs]');
const hasExpressProgram = dockerfileContent.includes('[program:express]');
const exposesPorts = dockerfileContent.includes('EXPOSE') && 
                     dockerfileContent.includes('3000') && 
                     dockerfileContent.includes('3001');

if (hasNextjsProgram && hasExpressProgram && exposesPorts) {
  console.log('✅ PASS: Dockerfile configured for both Next.js and Express');
} else {
  console.log('❌ FAIL: Dockerfile missing dual-mode configuration');
  allPassed = false;
}

// Test 6: Vercel config excludes Express
console.log('\nTest 6: Vercel config excludes Express files');
const vercelConfigPath = path.join(__dirname, 'vercel.json');
const vercelConfigContent = fs.readFileSync(vercelConfigPath, 'utf8');

const excludesServer = vercelConfigContent.includes('server.ts');
const excludesExpressAdapter = vercelConfigContent.includes('src/adapters/express');

if (excludesServer && excludesExpressAdapter) {
  console.log('✅ PASS: Vercel config properly excludes Express files');
} else {
  console.log('❌ FAIL: Vercel config missing Express exclusions');
  allPassed = false;
}

// Test 7: Package.json has proper scripts
console.log('\nTest 7: Package.json has required scripts');
const packagePath = path.join(__dirname, 'package.json');
const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const hasDevExpress = packageContent.scripts['dev:express'];
const hasDevAll = packageContent.scripts['dev:all'];
const hasDev = packageContent.scripts['dev'];
const hasBuild = packageContent.scripts['build'];

if (hasDevExpress && hasDevAll && hasDev && hasBuild) {
  console.log('✅ PASS: Package.json has all required scripts');
} else {
  console.log('❌ FAIL: Package.json missing required scripts');
  allPassed = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All architecture validation tests passed!');
  console.log('\nThe three-mode architecture is properly implemented:');
  console.log('  1. Local Express development ✓');
  console.log('  2. Vercel production deployment ✓');
  console.log('  3. Docker containerized execution ✓');
  process.exit(0);
} else {
  console.log('❌ Some architecture validation tests failed');
  console.log('Please review the errors above and fix them.');
  process.exit(1);
}

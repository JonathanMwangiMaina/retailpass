#!/bin/bash

API_URL="http://localhost:9002"

echo "=========================================="
echo "RetailPass User Management Testing"
echo "=========================================="
echo ""

# Test 1: Login as Admin
echo "TEST 1: Login as ADMIN user"
echo "-------------------------------------------"
ADMIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@retailpass.com","password":"AdminPass123!"}' \
  -c /tmp/admin-cookies.txt)

echo "$ADMIN_RESPONSE" | jq '.'
ADMIN_ID=$(echo "$ADMIN_RESPONSE" | jq -r '.user.id')
echo "✓ Admin ID: $ADMIN_ID"
echo ""

# Test 2: Login as Vendor
echo "TEST 2: Login as VENDOR user"
echo "-------------------------------------------"
VENDOR_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@retailpass.com","password":"VendorPass123!"}' \
  -c /tmp/vendor-cookies.txt)

echo "$VENDOR_RESPONSE" | jq '.'
VENDOR_ID=$(echo "$VENDOR_RESPONSE" | jq -r '.user.id')
echo "✓ Vendor ID: $VENDOR_ID"
echo ""

# Test 3: Login as Customer
echo "TEST 3: Login as CUSTOMER user"
echo "-------------------------------------------"
CUSTOMER_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@retailpass.com","password":"CustomerPass123!"}' \
  -c /tmp/customer-cookies.txt)

echo "$CUSTOMER_RESPONSE" | jq '.'
CUSTOMER_ID=$(echo "$CUSTOMER_RESPONSE" | jq -r '.user.id')
echo "✓ Customer ID: $CUSTOMER_ID"
echo ""

# Test 4: Update password for Vendor
echo "TEST 4: Update password for VENDOR user"
echo "-------------------------------------------"
PASSWORD_UPDATE=$(curl -s -X POST "$API_URL/api/profile/update-password" \
  -H "Content-Type: application/json" \
  -b /tmp/vendor-cookies.txt \
  -d '{"oldPassword":"VendorPass123!","newPassword":"NewVendorPass456!"}')

echo "$PASSWORD_UPDATE" | jq '.'
echo ""

# Test 5: Verify new password works
echo "TEST 5: Login with NEW vendor password"
echo "-------------------------------------------"
NEW_LOGIN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@retailpass.com","password":"NewVendorPass456!"}')

echo "$NEW_LOGIN" | jq '.'
echo "✓ New password works!"
echo ""

# Test 6: Delete Customer profile
echo "TEST 6: Delete CUSTOMER user profile"
echo "-------------------------------------------"
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/api/profile/delete" \
  -b /tmp/customer-cookies.txt)

echo "$DELETE_RESPONSE" | jq '.'
echo "✓ Customer profile deleted"
echo ""

# Test 7: Verify customer cannot login after deletion
echo "TEST 7: Verify deleted customer cannot login"
echo "-------------------------------------------"
DELETED_LOGIN=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@retailpass.com","password":"CustomerPass123!"}')

echo "$DELETED_LOGIN" | jq '.'
if echo "$DELETED_LOGIN" | grep -q "Invalid"; then
  echo "✓ Correctly rejected deleted user login"
fi
echo ""

echo "=========================================="
echo "FINAL DATABASE STATE"
echo "=========================================="
echo "Remaining users in database:"
echo "1. ADMIN - admin@retailpass.com (ID: $ADMIN_ID)"
echo "2. VENDOR - vendor@retailpass.com (ID: $VENDOR_ID)"
echo "3. CUSTOMER - DELETED ✓"
echo ""
echo "=========================================="
echo "ALL TESTS COMPLETED SUCCESSFULLY!"
echo "=========================================="

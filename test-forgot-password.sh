#!/bin/bash

API_URL="http://localhost:9002"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         FORGOT PASSWORD FLOW - END-TO-END TEST                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Request password reset
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1: Request Password Reset for ADMIN user"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RESET_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@retailpass.com"}')

echo "Response: $RESET_RESPONSE"
echo ""
echo "✓ Check server console logs for the reset token and URL"
echo ""

# Wait for user to get token
echo "Please check the server logs above and enter the reset token:"
read -p "Token: " RESET_TOKEN

# Step 2: Reset password with token
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 2: Reset Password with Token"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RESET_PASSWORD_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d "{\"token\":\"$RESET_TOKEN\",\"newPassword\":\"ResetAdminPass123!\"}")

echo "Response: $RESET_PASSWORD_RESPONSE"
echo ""

# Step 3: Try logging in with new password
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 3: Login with New Password"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@retailpass.com","password":"ResetAdminPass123!"}' \
  -w "\nHTTP_STATUS:%{http_code}")

LOGIN_STATUS=$(echo "$LOGIN_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
LOGIN_DATA=$(echo "$LOGIN_RESPONSE" | grep -v "HTTP_STATUS")

if [ "$LOGIN_STATUS" == "200" ]; then
  echo "✓ Login successful with new password (HTTP 200)"
  echo "$LOGIN_DATA"
else
  echo "✗ Login failed (HTTP $LOGIN_STATUS)"
  echo "$LOGIN_DATA"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

#!/bin/bash

API_URL="http://localhost:9002"
TEST_TOKEN="c217a27191766a49ac17ea3f6e518ac843ecee67eb39f5fceddd664b3341d32a"

echo "Testing reset password with token: $TEST_TOKEN"
echo ""

# Create JSON file
cat > /tmp/reset-payload.json << 'JSONEOF'
{
  "token": "c217a27191766a49ac17ea3f6e518ac843ecee67eb39f5fceddd664b3341d32a",
  "newPassword": "ResetAdminPass123!"
}
JSONEOF

echo "Payload:"
cat /tmp/reset-payload.json
echo ""

# Send request
echo "Sending request..."
curl -X POST "$API_URL/api/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d @/tmp/reset-payload.json \
  -v

echo ""
echo ""
echo "Now testing login with new password..."
curl -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@retailpass.com","password":"ResetAdminPass123!"}' \
  -s

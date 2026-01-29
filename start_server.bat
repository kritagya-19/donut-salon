@echo off
echo Starting Donut Salon Booking Backend...
cd server
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
echo Starting Server...
node server.js
pause

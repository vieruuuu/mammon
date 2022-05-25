echo "compiling for windows"
deno compile --import-map=import.map.json -o build/mammon-win32.exe --target x86_64-pc-windows-msvc -A --unstable mammon.ts

echo ""
echo "compiling for linux"
deno compile  --import-map=import.map.json -o build/mammon-linux --target x86_64-unknown-linux-gnu -A --unstable mammon.ts 


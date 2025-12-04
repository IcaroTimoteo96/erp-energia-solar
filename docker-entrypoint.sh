#!/bin/sh
set -e

echo "Running database migrations..."
dotnet ef database update --no-build

echo "Starting application..."
exec dotnet SolarCRM.Api.dll

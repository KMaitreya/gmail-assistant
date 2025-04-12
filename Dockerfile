# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY backend/ .

# Copy credentials.json into the Docker image (ensure it’s in the correct location)
COPY backend/credentials.json /app/credentials.json

# Expose the port Flask runs on
EXPOSE 5001

# Run the application
CMD ["python", "app.py"]

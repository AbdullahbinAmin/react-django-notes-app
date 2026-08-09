# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY mynotes/package*.json ./
RUN npm install
COPY mynotes/ ./
RUN npm run build

# Stage 2: Django Backend & Serving Frontend
FROM python:3.9-slim

WORKDIR /app/backend

# Install System packages required for MySQL Client Compilation and Healthchecks
RUN apt-get update \
	&& apt-get install -y gcc default-libmysqlclient-dev pkg-config curl \
	&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/backend/
RUN pip install mysqlclient
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY . /app/backend

# Copy built React static files from frontend-builder stage
COPY --from=frontend-builder /app/frontend/build /app/backend/mynotes/build

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

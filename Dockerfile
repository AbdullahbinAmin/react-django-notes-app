FROM python:3.9

# Set the working Directory inside the container
WORKDIR /app/backend

# Copy requirements.txt to install dependencies
COPY requirements.txt /app/backend

# Install System packages required for MYSQL Client Compilation
RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y gcc default-libmysqlclient-dev pkg-config \
	&& rm -rf /var/lib/apt/lists/*

# Install python dependencies
RUN pip install mysqlclient
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . /app/backend

# Expose Django Port
EXPOSE 8000

# Start Server using gunicorn in production
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"] 

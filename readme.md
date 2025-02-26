# Laravel 11 & Angular 19 Starter Kit

Welcome to the Laravel 11 & Angular 19 Starter Kit repository! This project aims to provide a robust starting point for building applications using Laravel 11 for the backend and Angular 19 for the frontend.

## Table of Contents

- [Laravel 11 \& Angular 19 Starter Kit](#laravel-11--angular-19-starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
    - [Backend (Laravel 11)](#backend-laravel-11)
    - [Frontend (Angular 19)](#frontend-angular-19)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This starter kit is designed to help developers quickly set up a new project with Laravel 11 and Angular 19. It includes essential configurations and best practices to streamline the development process.

## Features

- Laravel 11 for backend development
- Angular 19 for frontend development
- Pre-configured authentication
- RESTful API setup
- Basic CRUD operations
- Responsive design with Angular Material

## Installation

### Prerequisites

- PHP 8.1 or higher
- Node.js 16 or higher
- Composer
- Angular CLI

## Quick Start

 Clone the repository:
  ```bash
  git clone https://github.com/judempoyo/laravel11angular19starterkit.git
  cd laravel11angular19starterkit
  ```


### Backend (Laravel 11)
  
1. Navigate to the `backend` directory:
  ```bash
  cd backend
  ```

2. Install dependencies:
  ```bash
  composer install
  ```

3. Copy the `.env.example` file to `.env` and configure your environment variables:
  ```bash
  cp .env.example .env
  ```

4. Generate an application key:
  ```bash
  php artisan key:generate
  ```

5. Run migrations:
  ```bash
  php artisan migrate
  ```

### Frontend (Angular 19)

1. Navigate to the `frontend` directory:
  ```bash
  cd frontend
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Serve the Angular application:
  ```bash
  ng serve
  ```

## Usage

- Start the Laravel development server:
  ```bash
  php artisan serve
  ```

- Access the Angular application at `http://localhost:4200`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
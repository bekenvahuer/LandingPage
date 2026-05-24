# 📱 Clickcita - Landing Page de Agendamiento

![Versión](https://img.shields.io/badge/versión-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff)

> **Landing page** para la reserva de citas. Esta aplicación frontend consume una **API REST desarrollada con Laravel** y permite a los clientes visualizar servicios, fechas disponibles y agendar turnos de forma rápida y sencilla.

## 🎯 Propósito del proyecto

Esta landing page actúa como el **punto de acceso principal** para que los usuarios:
- Conozcan los servicios ofrecidos.
- Seleccionen un profesional o servicio.
- Elijan una fecha y hora disponibles.
- Envíen la solicitud de cita a la API de Laravel.
- Reciban confirmación por correo (gestionado por el backend).

## 🛠️ Tecnologías utilizadas

| Capa            | Tecnologías                                      |
|-----------------|--------------------------------------------------|
| **Frontend**    | React 18, TypeScript, Vite, React Router DOM    |
| **Estilos**     | TailwindCSS (o CSS Modules según prefieras)     |
| **Cliente HTTP**| Axios / Fetch API                                |
| **Backend (API)** | Laravel 11 (PHP) – repositorio separado       |
| **Despliegue**  | Vercel, Netlify o cualquier servidor estático   |

## 📋 Requisitos previos

- Node.js (v18 o superior)
- npm o yarn
- Conocer la URL base de la **API de Laravel** (ej. `https://api.clickcita.com` o `http://localhost:8000`)

## 🚀 Instalación y configuración

Sigue estos pasos para ejecutar la landing page en tu entorno local.

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tu-usuario/clickcita-landing.git
   cd clickcita-landing

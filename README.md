# 🌐 FiberTech - Aplicación de Fibra Óptica

Aplicación web moderna para gestión y información de servicios de fibra óptica.

## ✨ Características principales

- 🚀 **Interfaz moderna** con Next.js 14 y App Router
- 🎨 **Diseño responsivo** con Tailwind CSS
- 🧩 **Componentes reutilizables** con Radix UI
- ⚡ **Optimización de rendimiento** y SEO
- 📱 **Experiencia móvil optimizada**
- 🔧 **TypeScript** para desarrollo type-safe

## 🛠️ Stack tecnológico

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: Radix UI
- **Iconos**: Lucide React
- **Deployment**: Netlify
- **Gestor de paquetes**: pnpm

## 🚀 Instalación y uso

### Prerrequisitos
- Node.js 18+
- pnpm (recomendado) o npm

### Instalación local

1. **Clona el repositorio**:
```bash
git clone https://github.com/davto-xyz/fibranet.git
cd fibranet
```

2. **Instala dependencias**:
```bash
pnpm install
# o
npm install
```

3. **Ejecuta el servidor de desarrollo**:
```bash
pnpm dev
# o
npm run dev
```

4. **Abre tu navegador** en [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build para producción
pnpm start        # Servidor de producción
pnpm lint         # Linting del código
```

## 📁 Estructura del proyecto

```
fibranet/
├── app/                 # App Router (Next.js 14)
├── components/          # Componentes React reutilizables
│   ├── ui/             # Componentes base de UI
│   └── ...
├── lib/                # Utilidades y configuraciones
├── public/             # Assets estáticos
├── styles/             # Estilos globales
├── types/              # Definiciones de TypeScript
└── ...
```

## 🎨 Componentes UI

El proyecto utiliza una biblioteca de componentes personalizada basada en:
- **Radix UI** para funcionalidad accesible
- **Tailwind CSS** para estilos
- **class-variance-authority** para variantes de componentes
- **Lucide React** para iconografía

## 🌐 Deployment

La aplicación está configurada para deployment automático en **Netlify**:

- **Producción**: Autodeploy desde rama `main`
- **Preview**: Autodeploy desde pull requests
- **Configuración**: `netlify.toml`

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/davto-xyz/fibranet)

## 🔧 Configuración

### Tailwind CSS
Configuración personalizada en `tailwind.config.ts` con:
- Tema extendido
- Animaciones personalizadas
- Variables CSS customizadas

### TypeScript
Configuración estricta para desarrollo type-safe.

## 📱 Características técnicas

- ✅ **Responsive design** para todos los dispositivos
- ✅ **Performance optimizado** con Next.js
- ✅ **SEO friendly** con meta tags dinámicos
- ✅ **Accesibilidad** con componentes Radix UI
- ✅ **Code splitting** automático
- ✅ **Image optimization** con Next.js Image

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Contacto

Para consultas sobre el proyecto, puedes contactar a través del repositorio de GitHub.

---

<div align="center">
    <p>Desarrollado con ❤️ para el futuro de la conectividad</p>
</div>
# React Three Fiber Skeletal code

Project creation instructions at:

https://dev.to/saloship/base-setup-for-3-d-web-dev-30h5

# SUPER IMPORTANT:

Since this app will be served behing a reverse proxy at the address:

```
https://fakhirshaheen.com/corplux
```

- Base path `/corplex` must be added to the vite.config.js file:
- Also all of the assets currently in the `public` folder have to be manually appended with `/corplux`.

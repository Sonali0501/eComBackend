import '@utils/config.utils';
import App from './app';
import ProductRoutes from '@routes/product.route';

const app = new App([new ProductRoutes()]);
app.listen();

export default app;

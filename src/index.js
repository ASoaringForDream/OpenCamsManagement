import dva from 'dva';
import createLoading from 'dva-loading';
import 'assets/normalize.css';

// 1. Initialize
import { createBrowserHistory as createHistory } from 'history';
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./routes/index').default);

// 5. Start
app.start('#root');

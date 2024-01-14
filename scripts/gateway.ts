import { createGatewayOnNodeRuntime } from '@lobehub/chat-plugins-gateway';
import cors from 'cors';
import express from 'express';
import { hideBin } from 'yargs/helpers';
// 上述代码的模块
import yargs from 'yargs/yargs';

// 解析命令行参数
const argv = yargs(hideBin(process.argv))
  .option('port', {
    alias: 'p',
    default: 4000,
    describe: 'The port to run the CLI proxy server on',
    type: 'number',
  })
  .parse();

// 创建 Express 服务器
const app = express();
app.use(cors()); // 启用 CORS 中间件
app.use(express.text({ type: 'text/plain' }));

// 使用你的代理逻辑作为中间件

const handler = createGatewayOnNodeRuntime();
app.post('/', handler as any);

// 启动服务器并监听指定的端口
app.listen(argv.port, () => {
  console.log(`CLI proxy server is running on port ${argv.port}`);
});

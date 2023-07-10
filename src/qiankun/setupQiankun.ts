import { registerMicroApps, addGlobalUncaughtErrorHandler } from 'qiankun';

// import { http } from '@/utils/http/axios';

//获取主控台信息

export async function setupQiankun() {
  const qiankunRouter2: Array<any> = [];
  await import('@/router').then((router) => {
    const routerList = router.default.getRoutes();
    routerList.forEach((c) => {
      if (c.meta?.isQiankunRouter) {
        console.log(c.meta.isQiankunRouter['entry']);

        qiankunRouter2.push(c.meta.isQiankunRouter);
      }
    });
  });

  const promise1 = new Promise((resolve, reject) => {
    fetch('http://localhost:8086/qiankun.config.js')
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  const promise2 = new Promise((resolve, reject) => {
    fetch('http://localhost:8085/qiankun.config.js')
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  Promise.all([promise1, promise2])
    .then((results) => {
      console.log(qiankunRouter2);

      registerMicroApps(qiankunRouter2, {
        beforeLoad: [
          (currentApp) => {
            console.log('before load', currentApp);
            return Promise.resolve();
          },
        ], // 挂载前回调
        beforeMount: [
          (currentApp) => {
            console.log('before mount', currentApp);
            return Promise.resolve();
          },
        ], // 挂载后回调
        afterUnmount: [
          (currentApp, a) => {
            const name = currentApp.name;
            console.log('after unload', currentApp, a[name]);
            // a[name].unmount();
            return Promise.resolve();
          },
        ],
      });
    })
    .catch((error) => {
      // 处理错误
      console.log('youwenti1');
    });
}

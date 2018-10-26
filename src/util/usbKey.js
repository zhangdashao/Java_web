import { SoftKey3W } from './Syunew6';

// export function login_onclick() {
//   return new Promise((resolve, reject) => {
//     // 如果是IE10及以下浏览器，则使用AVCTIVEX控件的方式
//     if (navigator.userAgent.indexOf('MSIE') > 0 && !navigator.userAgent.indexOf('opera') > -1) return Handle_IE10();


//     try {
//       let DevicePath,
//         mylen,
//         ret,
//         keyid,
//         username,
//         mykey,
//         outstring,
//         address,
//         mydata,
//         i,
//         InString,
//         versionex,
//         version;
//       let PubKeyX,
//         PubKeyY,
//         PriKey,
//         UserName,
//         Pin;

//       // 由于是使用事件消息的方式与服务程序进行通讯，
//       // 好处是不用安装插件，不分系统及版本，控件也不会被拦截，同时安装服务程序后，可以立即使用，不用重启浏览器
//       // 不好的地方，就是但写代码会复杂一些
//       const s_simnew1 = new SoftKey6W(); // 创建UK类

//       s_simnew1.Socket_UK.onopen = function () {
//         s_simnew1.ResetOrder();// 这里调用ResetOrder将计数清零，这样，消息处理处就会收到0序号的消息，通过计数及序号的方式，从而生产流程
//       };

//       // 写代码时一定要注意，每调用我们的一个UKEY函数，就会生产一个计数，即增加一个序号，较好的逻辑是一个序号的消息处理中，只调用我们一个UKEY的函数
//       s_simnew1.Socket_UK.onmessage = function got_packet(Msg) {
//         const UK_Data = JSON.parse(Msg.data);
//         if (UK_Data.type != 'Process') return;// 如果不是流程处理消息，则跳过
//         // alert(Msg.data);
//         switch (UK_Data.order) {
//           case 0:
//             {
//               s_simnew1.FindPort(0);// 查找加密锁
//             }
//             break;//! !!!!重要提示，如果在调试中，发现代码不对，一定要注意，是不是少了break,这个少了是很常见的错误
//           case 1:
//             {
//               if (UK_Data.LastError != 0) { window.alert('未发现加密锁，请插入加密锁'); s_simnew1.Socket_UK.close(); return false; }
//               DevicePath = UK_Data.return_value;// 获得返回的UK的路径
//               s_simnew1.GetChipID(DevicePath);// 返回芯片唯一ID
//             }
//             break;
//           case 2:
//             {
//               if (UK_Data.LastError != 0) { window.alert(`返回芯片唯一ID时出现错误，错误码为：${UK_Data.LastError.toString()}`); s_simnew1.Socket_UK.close(); return false; }
//               outstring = UK_Data.return_value;
//               resolve(outstring);
//               s_simnew1.Socket_UK.close();
//             }
//             break;
//         }
//       };
//     } catch (e) {
//       reject(e);
//     }
//   });
// }
export function login_onclick2() {
  return new Promise((resolve, reject) => {
    try {
      let DevicePath,
        mylen,
        ret,
        keyid,
        username,
        mykey,
        outstring,
        address,
        mydata,
        i,
        InString,
        versionex,
        version,
        seed;
      let ProduceDate,
        macAddr;


      // 由于是使用事件消息的方式与服务程序进行通讯，
      // 好处是不用安装插件，不分系统及版本，控件也不会被拦截，同时安装服务程序后，可以立即使用，不用重启浏览器
      // 不好的地方，就是但写代码会复杂一些
      const s_simnew1 = new SoftKey3W(); // 创建UK类

      s_simnew1.Socket_UK.onopen = function () {
        s_simnew1.ResetOrder();// 这里调用ResetOrder将计数清零，这样，消息处理处就会收到0序号的消息，通过计数及序号的方式，从而生产流程
      };

      // 写代码时一定要注意，每调用我们的一个UKEY函数，就会生产一个计数，即增加一个序号，较好的逻辑是一个序号的消息处理中，只调用我们一个UKEY的函数
      s_simnew1.Socket_UK.onmessage = function got_packet(Msg) {
        const UK_Data = JSON.parse(Msg.data);
        if (UK_Data.type != 'Process') return;// 如果不是流程处理消息，则跳过
        // alert(Msg.data);
        switch (UK_Data.order) {
          case 0:
            {
              s_simnew1.FindPort(0);// 查找加密锁
            }
            break;//! !!!!重要提示，如果在调试中，发现代码不对，一定要注意，是不是少了break,这个少了是很常见的错误
          case 1:
            {
              if (UK_Data.LastError != 0) { window.alert('未发现加密锁，请插入加密锁'); s_simnew1.Socket_UK.close(); return false; }
              DevicePath = UK_Data.return_value;// 获得返回的UK的路径

              s_simnew1.GetID_1(DevicePath); // '读取锁的ID
            }
            break;
          case 2:
            {
              if (UK_Data.LastError != 0) { window.alert(`读取锁的ID时错误，错误码为：${UK_Data.LastError.toString()}`); s_simnew1.Socket_UK.close(); return false; }
              keyid = toHex(UK_Data.return_value);
              s_simnew1.GetID_2(DevicePath); // '读取锁的ID
            }
            break;
          case 3:
            {
              if (UK_Data.LastError != 0) { window.alert(`读取锁的ID时错误，错误码为：${UK_Data.LastError.toString()}`); s_simnew1.Socket_UK.close(); return false; }
              keyid += toHex(UK_Data.return_value);
              resolve(keyid);
              // 所有工作处理完成后，关掉Socket
              s_simnew1.Socket_UK.close();
            }
            break;
        }
      };
    } catch (e) {
      reject(e);
    }
  });
}

function toHex(n) {
  const digitArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let result = '';
  let start = true;

  for (let i = 32; i > 0;) {
    i -= 4;
    const digit = (n >> i) & 0xf;

    if (!start || digit != 0) {
      start = false;
      result += digitArray[digit];
    }
  }

  return (result == '' ? '0' : result);
}

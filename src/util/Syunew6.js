
export function SoftKey3W() {
  let isIE11 = navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf('rv:11.0') > -1;
  let isEDGE = navigator.userAgent.indexOf('Edge') > -1;
  let u = document.URL;
  let url;
  if (u.substring(0, 5) == 'https') {
    if (isIE11 || isEDGE) {
      url = 'wss://127.0.0.1:4006/xxx';
    } else {
      url = 'wss://localhost:4006/xxx';
    }
  } else {
    url = 'ws://127.0.0.1:4006/xxx';
  }

  let Socket_UK;

  if (typeof MozWebSocket !== 'undefined') {
    Socket_UK = new MozWebSocket(url, 'usbkey-protocol');
  } else {
    this.Socket_UK = new WebSocket(url, 'usbkey-protocol');
  }

  this.FindPort = function (start) {
    let msg =
    {
      FunName: 'FindPort',
      start,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.FindPort_2 = function (start, in_data, verf_data) {
    let msg =
    {
      FunName: 'FindPort_2',
      start,
      in_data,
      verf_data,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.FindPort_3 = function (start, in_data, verf_data) {
    let msg =
    {
      FunName: 'FindPort_3',
      start,
      in_data,
      verf_data,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetVersion = function (Path) {
    let msg =
    {
      FunName: 'GetVersion',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetVersionEx = function (Path) {
    let msg =
    {
      FunName: 'GetVersionEx',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetID_1 = function (Path) {
    let msg =
    {
      FunName: 'GetID_1',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetID_2 = function (Path) {
    let msg =
    {
      FunName: 'GetID_2',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };


  this.sRead = function (Path) {
    let msg =
    {
      FunName: 'sRead',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.sWrite = function (InData, Path) {
    let msg =
    {
      FunName: 'sWrite',
      InData,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.sWrite_2 = function (InData, Path) {
    let msg =
    {
      FunName: 'sWrite_2',
      InData,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.sWrite_2Ex = function (InData, Path) {
    let msg =
    {
      FunName: 'sWrite_2Ex',
      InData,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.sWriteEx = function (InData, Path) {
    let msg =
    {
      FunName: 'sWriteEx',
      InData,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.sWriteEx_New = function (InData, Path) {
    let msg =
    {
      FunName: 'sWriteEx_New',
      InData,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.sWrite_2Ex_New = function (InData, Path) {
    let msg =
    {
      FunName: 'sWrite_2Ex_New',
      InData,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetCal = function (Hkey, Lkey, new_Hkey, new_Lkey, Path) {
    let msg =
    {
      FunName: 'SetCal',
      Hkey,
      Lkey,
      new_Hkey,
      new_Lkey,
      Path,

    };
    this.Socket_UK.send(JSON.stringify(msg));
  };


  this.SetBuf = function (InData, pos) {
    let msg =
    {
      FunName: 'SetBuf',
      InData,
      pos,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetBuf = function (pos) {
    let msg =
    {
      FunName: 'GetBuf',
      pos,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YRead = function (Address, HKey, LKey, Path) {
    let msg =
    {
      FunName: 'YRead',
      Address,
      HKey,
      LKey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YWrite = function (InData, Address, HKey, LKey, Path) {
    let msg =
    {
      FunName: 'YWrite',
      InData,
      Address,
      HKey,
      LKey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YReadEx = function (Address, len, HKey, LKey, Path) {
    let msg =
    {
      FunName: 'YReadEx',
      Address,
      len,
      HKey,
      LKey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YWriteEx = function (Address, len, HKey, LKey, Path) {
    let msg =
    {
      FunName: 'YWriteEx',
      Address,
      len,
      HKey,
      LKey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YReadString = function (Address, len, HKey, LKey, Path) {
    let msg =
    {
      FunName: 'YReadString',
      Address,
      len,
      HKey,
      LKey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YWriteString = function (InString, Address, HKey, LKey, Path) {
    let msg =
    {
      FunName: 'YWriteString',
      InString,
      Address,
      HKey,
      LKey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetWritePassword = function (W_Hkey, W_Lkey, new_Hkey, new_Lkey, Path) {
    let msg =
    {
      FunName: 'SetWritePassword',
      W_Hkey,
      W_Lkey,
      new_Hkey,
      new_Lkey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetReadPassword = function (W_Hkey, W_Lkey, new_Hkey, new_Lkey, Path) {
    let msg =
    {
      FunName: 'SetReadPassword',
      W_Hkey,
      W_Lkey,
      new_Hkey,
      new_Lkey,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };


  this.DecString = function (InString, Key) {
    let msg =
    {
      FunName: 'DecString',
      InString,
      Key,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.EncString = function (InString, Path) {
    let msg =
    {
      FunName: 'EncString',
      InString,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.EncString_New = function (InString, Path) {
    let msg =
    {
      FunName: 'EncString_New',
      InString,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.Cal = function (Path) {
    let msg =
    {
      FunName: 'Cal',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.Cal_New = function (Path) {
    let msg =
    {
      FunName: 'Cal_New',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetCal_2 = function (Key, Path) {
    let msg =
    {
      FunName: 'SetCal_2',
      Key,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetCal_New = function (Key, Path) {
    let msg =
    {
      FunName: 'SetCal_New',
      Key,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetEncBuf = function (InData, pos) {
    let msg =
    {
      FunName: 'SetEncBuf',
      InData,
      pos,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetEncBuf = function (pos) {
    let msg =
    {
      FunName: 'GetEncBuf',
      pos,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };


  this.ReSet = function (Path) {
    let msg =
    {
      FunName: 'ReSet',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetID = function (Seed, Path) {
    let msg =
    {
      FunName: 'SetID',
      Seed,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetProduceDate = function (Path) {
    let msg =
    {
      FunName: 'GetProduceDate',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.MacAddr = function () {
    let msg =
    {
      FunName: 'MacAddr',
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };


  this.GetChipID = function (Path) {
    let msg =
    {
      FunName: 'GetChipID',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.StarGenKeyPair = function (Path) {
    let msg =
    {
      FunName: 'StarGenKeyPair',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GenPubKeyY = function () {
    let msg =
    {
      FunName: 'GenPubKeyY',
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GenPubKeyX = function () {
    let msg =
    {
      FunName: 'GenPubKeyX',
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GenPriKey = function () {
    let msg =
    {
      FunName: 'GenPriKey',
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetPubKeyY = function (Path) {
    let msg =
    {
      FunName: 'GetPubKeyY',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetPubKeyX = function (Path) {
    let msg =
    {
      FunName: 'GetPubKeyX',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.GetSm2UserName = function (Path) {
    let msg =
    {
      FunName: 'GetSm2UserName',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.Set_SM2_KeyPair = function (PriKey, PubKeyX, PubKeyY, sm2UserName, Path) {
    let msg =
    {
      FunName: 'Set_SM2_KeyPair',
      PriKey,
      PubKeyX,
      PubKeyY,
      sm2UserName,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YtSign = function (SignMsg, Pin, Path) {
    let msg =
    {
      FunName: 'YtSign',
      SignMsg,
      Pin,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YtSign_2 = function (SignMsg, Pin, Path) {
    let msg =
    {
      FunName: 'YtSign_2',
      SignMsg,
      Pin,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YtVerfiy = function (id, SignMsg, PubKeyX, PubKeyY, VerfiySign, Path) {
    let msg =
    {
      FunName: 'YtVerfiy',
      id,
      SignMsg,
      PubKeyX,
      PubKeyY,
      VerfiySign,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SM2_DecString = function (InString, Pin, Path) {
    let msg =
    {
      FunName: 'SM2_DecString',
      InString,
      Pin,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SM2_EncString = function (InString, Path) {
    let msg =
    {
      FunName: 'SM2_EncString',
      InString,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.YtSetPin = function (OldPin, NewPin, Path) {
    let msg =
    {
      FunName: 'YtSetPin',
      OldPin,
      NewPin,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.FindU = function (start) {
    let msg =
    {
      FunName: 'FindU',
      start,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.FindU_2 = function (start, in_data, verf_data) {
    let msg =
    {
      FunName: 'FindU_2',
      start,
      in_data,
      verf_data,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.FindU_3 = function (start, in_data, verf_data) {
    let msg =
    {
      FunName: 'FindU_3',
      start,
      in_data,
      verf_data,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.IsUReadOnly = function (Path) {
    let msg =
    {
      FunName: 'IsUReadOnly',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetUReadOnly = function (Path) {
    let msg =
    {
      FunName: 'SetUReadOnly',
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.SetHidOnly = function (IsHidOnly, Path) {
    let msg =
    {
      FunName: 'SetHidOnly',
      IsHidOnly,
      Path,
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.ResetOrder = function () {
    let msg =
    {
      FunName: 'ResetOrder',
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };

  this.ContinueOrder = function () {
    let msg =
    {
      FunName: 'ContinueOrder',
    };
    this.Socket_UK.send(JSON.stringify(msg));
  };
}

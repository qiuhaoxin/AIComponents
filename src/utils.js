

//过滤特殊字符
export const trimSpecial=(text)=>{
    if(isEmpty(text))return;
    text=text.replace(/[\ |\~|\，|\。|\`|\!|\！|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\？|\n]/g,""); 
    return text;
}

/*
* 判断字符串是否为空
* @Param str 目标字符串
*/
export const isEmpty=(str)=>{
  const emptyReg=/^\s*$/;
  if(emptyReg.test(str)){
    return true;
  }
  return false;
}

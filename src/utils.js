

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


/**
 * 用分隔符按位数分隔数字
 * @param  {[type]} number    [description]
 * @param  {Number} splitNum  [description]
 * @param  {String} delimiter [description]
 * @return {[type]}           [description]
 */
export const splitNumByDelimiter=function(number,splitNum,delimiter){
    let numArr=number.split('');
    if(numArr.length < splitNum)return number;
    const newArr=[];
    numArr=numArr.reverse();
    numArr.forEach((item,index)=>{
        const mo=index % splitNum;
        if(mo < splitNum){
            newArr.push(item);
            if(mo==(splitNum - 1)){
                newArr.push(delimiter);
            }
        }
    })
    let newStr=newArr.reverse().join('');
    if(newStr.indexOf(delimiter)==0){
        newStr=newStr.substring(1);
    }
    return newStr;
}

/**
 * [splitNum description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const splitNum=function(value,splitNum,delimiter){
    const newStr=value.replace(/(\D*)([0-9]+)(\D*)/,function(){
        const newNum=splitNumByDelimiter(arguments[2],splitNum,delimiter);
        return arguments[1]+newNum+arguments[3];
    })
    return newStr;
}

/**
 * [description]
 * @param  {[type]} arr [description]
 * @param  {[type]}     [description]
 * @return {[type]}     [description]
 */
export const createArrBy=(arr,targetArr)=>{	
     let newArr=[]; 
     arr.forEach(item=>{
     	let obj={};
     	let result=targetArr.filter(itemData=>itemData.key.indexOf(item)>-1);
     	if(result.length > 0){
            result=result[0];
            obj.key=item;
            obj.value=result.value;
            newArr.push(obj);
     	}
     })
     return newArr;
}

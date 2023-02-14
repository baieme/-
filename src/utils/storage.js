export const getItem = item=>{
  let value = window.localStorage.getItem(item);
  console.log(value,'value')
  //判断没有拿到值直接返回原值，
  // if(!value){
  //   return value;
  // }
  // console.log(JSON.parse(value),'asdfasdf')
  try{
    return JSON.parse(value);
  }catch(err){
    return value;
  }
}

export const setItem = (item,value)=>{
  if(typeof value == 'object'){
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(item,value)
}

export const removeItem = item=>{
  return window.localStorage.removeItem(item);
}




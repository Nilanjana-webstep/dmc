export const makeClearMessage = (notClearMessage)=>{
    const clearMessage = notClearMessage.replace(/[\\"]/g,"");
    return clearMessage;
}


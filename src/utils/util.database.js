export const updateDatabaseObject = (updateValue,databaseValue)=>{
    
    for( const key in updateValue ){
        
        databaseValue[key] = updateValue[key]
    }

    return databaseValue;
    
}
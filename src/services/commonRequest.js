import axios from 'axios'

export const commonRequest = async (method,url,body)=>{
    let config = {
        method,
        url,
        data:body,
        headers:
        {
            "Content-Type":"application/json"
        }
    }
    return axios(config).then(
        (data)=>{
            return data
        }
    ).catch((err)=>{
        return err
    })
}
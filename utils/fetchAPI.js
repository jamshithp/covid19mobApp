const URLStates = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
var options = {
    method: 'GET',
        headers: {
            Host: 'cdn-api.co-vin.in',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
        }
    }

export const getStates = async() =>{
    const res = await fetch(URLStates,options);
    if(res.ok)
    {
        return res.json().then(data=>{
            return data.states;
        })
    }
}

export const getDistricts = async(stateID)=>{
    const URLDistrictList = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/`+stateID;
    const results = await fetch(URLDistrictList,options);
    if(results.ok)
    {
        return results.json().then(res=>{
            return res.districts;
        })
    }
}

export const getSlots = async(ID,date) => {
    const URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=`+ID+`&date=`+date;
    const results = await fetch(URL, options);
    if(results.ok)
    {
        return results.json().then(res=>{
            return res.centers;
        })
    }
}

export const getOTP = async(mobile) => {
    let txnID="";
    const formData = {
        "mobile": mobile
    }
    const requestOptions={
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    };
    const URL = "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP";
    const res = await fetch(URL,requestOptions);
    if(res.ok)
    {
        return res.json().then(val=>{
            console.log("OTP FETCH",val);
            txnID = val.txnId;
        })
    }
    console.log(txnID);
}

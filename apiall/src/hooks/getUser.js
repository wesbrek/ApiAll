import React, {useState, useEffect} from 'react';

const GetUser = (email, password) => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        var url = new URL("https://bootcamp-users.herokuapp.com/"),
        params = {email: email, password :password}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(resp => resp.json())
        .then(res => {
            setInfo(res.u);
        }).catch(ex => {
            console.error(ex);
        })
    }, []);

    return info;
}

export default GetUser;

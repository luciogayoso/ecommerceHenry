import React, {useEffect} from 'react';


export default function GoogleLoginSuccess() {
	useEffect(() => {
		window.opener.open('/me','_self');
		window.opener.focus(); 
		window.close();
	}, []);

	return <div />;
}
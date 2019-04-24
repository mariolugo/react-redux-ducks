import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function App({children}) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

export default App;
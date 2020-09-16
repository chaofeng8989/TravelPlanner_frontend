import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; 

// export default () => (
//     <Popup trigger={<button> Trigger</button>} position="right center">
//       <div>Popup content here !!</div>
//     </Popup>
//   );

class Login extends Component {
    render() {
        return (
            <div className='userlogin'>
                <Popup 
                    trigger={<button> Login</button>} 
                    position="bottom right"
                    closeOnDocumentClick={false}
                    offsetX={-400}
                    offsetY={200}
                    >
                    <div>Login Content Here !!</div>
                </Popup>
            </div>

        )
    }
}

export default Login;
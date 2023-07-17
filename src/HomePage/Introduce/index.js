
import './introduce.scss'
import Whale from './whale.gif'

function Introduce() {
    return (
        <div className='col-lg-12 introduce'>
            <div className='content col-lg-3'>
                <div className='how-about'><i className="fa-solid fa-fire"></i> HOW ABOUT A CHAT</div>
                <p className='intro'>Have a <span style={{color:'#d85889'}}>BIG IDEA</span> in mind? Let's discuss what we can achieve together.</p>
                <div className='connect-team col-lg-8'>
                    <div className='image-user'>
                        <div className='item'>
                            <img src='https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/334198654_747462426944725_8795385163218375556_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NjZd4ya8xk4AX_B06Le&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfBX72RdG0PI7xPeqq3IkE_FIVvNZVx_wn_I0-XgPFdI4w&oe=6494D014'  height='100%' />
                        </div>
                        <div className='item'>
                            <img src='https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/334198654_747462426944725_8795385163218375556_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NjZd4ya8xk4AX_B06Le&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfBX72RdG0PI7xPeqq3IkE_FIVvNZVx_wn_I0-XgPFdI4w&oe=6494D014'  height='100%' />
                        </div>
                        <div className='item'>
                            <img src='https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/334198654_747462426944725_8795385163218375556_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NjZd4ya8xk4AX_B06Le&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfBX72RdG0PI7xPeqq3IkE_FIVvNZVx_wn_I0-XgPFdI4w&oe=6494D014'  height='100%' />
                        </div>
                    </div>
                    <div className='message'>
                        <p>Connecting to create success</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-6 whale'>
                <img src={Whale}  width='100%' />
            </div>
        </div>
    );
}

export default Introduce;
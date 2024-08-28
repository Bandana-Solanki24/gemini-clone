import React, { useContext } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} />
            </div>
            <div className='main-container'>
                {!showResult ?
                    <>
                        <div className='greet'>
                            <p><span>Hello , Developer</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className='cards'>
                            <div className="card">
                                <p>Suggest beautiful places to see on the upcoming trips</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Bri</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="userIcon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?

                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>

                    </div>
                }

                <div className='main-bottom'>
                    <div className="search-box">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)} type="text" placeholder='Enter prompt here ' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque totam
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Main

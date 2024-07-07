import React, { useEffect, useState } from 'react';
import './css/homepage.css';

// route
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate } from "react-router-dom";

//react-icon
import { CiTimer } from "react-icons/ci";

export default function HomePageBox({ item }) {

    // Type & Date
    const [TypeProduct, setTypeProduct] = useState('');
    const [dateProduct, setdateProduct] = useState('');

    // Current Time
    const [Calculate_Hour, setCalculate_Hour] = useState(0);
    const [Calculate_Min, setCalculate_Min] = useState(0);
    const [Calculate_Day, setCalculate_Day] = useState(0);
    const [Caculate_Month, setCalculate_Month] = useState(0);

    useEffect(() => {
        fun_checkType();
        fun_getDateProduct();
        fun_currentTime(item.created_at);
    })

    //Onclick to Content
    const navigate = useNavigate();
    const DirectContent = () => {
        navigate('/content/' + item.id);
    }

    // Check type
    const fun_checkType = () => {
        if (item.type == "Clash Of Clan") {
            setTypeProduct('../../../img/coc.jpg');
        } else if (item.type == "Growtopia") {
            setTypeProduct('../../../img/gt.jpg');
        } else if (item.type == "Mobile Legend") {
            setTypeProduct('../../../img/mlbb.jpg');
        }else if (item.type == "Pubg Mobile") {
            setTypeProduct('../../../img/pubg.jpg');
        }else if (item.type == "Free Fire") {
            setTypeProduct('../../../img/freefire.jpg');
        }
    }

    // Convert to Date Product
    const fun_getDateProduct = () => {
        let date = item.created_at;
        let temp = "";
        for (let index = 0; index < 10; index++) {
            temp = temp + date[index];
        }
        setdateProduct(temp)
    }

    // Caculate Time
    const fun_currentTime = (time) => {

        // Data date & time  (-5 h)
        let Time = time;
        let hour = "";
        let min = "";
        let day = "";
        let month = "";
        for (let index = 0; index < 16; index++) {
            if (index == 5 || index == 6) {   // day
                month = month + Time[index];
            }
            else if (index == 8 || index == 9) {   // day
                day = day + Time[index];
            }
            else if (index == 11 || index == 12) {  // hour
                hour = hour + Time[index];
            } else if (index == 14 || index == 15) {  // min
                min = min + Time[index];
            }
        }

        // Current Date & time
        let date = new Date();
        let temp = date.toISOString();   // (-5 h)
        let Currenthour = "";
        let Currentmin = "";
        let Currentday = "";
        let Currentmonth = "";
        // loop h , min of Current time
        for (let index = 0; index < 21; index++) {
            if (index == 5 || index == 6) {   // current month
                Currentmonth = Currentmonth + temp[index];
            }
            else if (index == 8 || index == 9) {   // current day
                Currentday = Currentday + temp[index];
            }
            else if (index == 11 || index == 12) {  // current hour
                Currenthour = Currenthour + temp[index];
            } else if (index == 14 || index == 15) {  // current min
                Currentmin = Currentmin + temp[index];
            }
        }

        var calculateMonth = 0;
        var calculateDay = 0;
        var calculateHour = 0;
        var calculateMin = 0;


        calculateMonth = parseInt(Currentmonth) - parseInt(month);
        setCalculate_Month(calculateMonth);


        calculateDay = parseInt(Currentday) - parseInt(day);
        if (calculateMonth == 0) {
            setCalculate_Day(calculateDay);
        }
        if (calculateMonth != 0) {   // If move to next month and not yet full 30day of data day
            const mon = (30 - parseInt(day)) + parseInt(Currentday)
            calculateMonth = 0;
            calculateDay = mon;    // set show day only
            setCalculate_Day(mon);
            calculateHour = 1;
            calculateMin = 1;
            if (mon >= 29) {  // if data day is full 30 => = 1month
                setCalculate_Month(parseInt(Currentmonth) - parseInt(month));
            }
            if (parseInt(day) == 31) {  // if data date 31 & minth have 31 => +1
                const mon = (31 - parseInt(day)) + parseInt(Currentday)
                setCalculate_Day(mon)
            }
        }

        // calculate hour   ** ta lers day hz lem kvol hour hz
        calculateHour = parseInt(Currenthour) - parseInt(hour);
        if (calculateDay == 0) {
            setCalculate_Hour(calculateHour)
        }

        calculateMin = parseInt(Currentmin) - parseInt(min);
        if (calculateHour == 0) {   // if not differnt hour => can count min
            setCalculate_Min(calculateMin)
        }

        check_showtime(calculateMonth, calculateDay, calculateHour, calculateMin);

        // Not yet Calculate 60Min = 1h , 24h = 1d
        //now just calculte differt hour = 1h , differt day = 1d
    }

    // show & dont show time if = 0
    const [min, setmin] = useState(false);
    const [h, seth] = useState(false);
    const [d, setd] = useState(false);
    const [mon, setmon] = useState(false);

    const check_showtime = (month, day, hour, min) => {
        if (month == 0) {
            setmon(true);
            setd(false)   // show day
            if (day == 0) {
                setmon(true);
                setd(true);
                seth(false);  // show hour   
                if (hour == 0) {
                    setmon(true);
                    setd(true);
                    seth(true);
                    setmin(false);  // show min                
                }
            }
        }
        else if (day == 0) {
            setmon(true);
            setd(true);
            seth(false);  // show hour
        }
        else if (hour == 0) {
            setmon(true);
            setd(true);
            seth(true);
            setmin(false);  // show min
        }
        else if (min == 0) {
            setmon(true);
            setd(true);
            seth(true);
            setmon(true);  // show just now
        }
    }

    return (
        // <div onClick={DirectContent}>
        //     <a>
        //         <div id='home_box'>
        //             <div id='home_box_pic'>
        //                 <img src={TypeProduct}/>
        //             </div>
        //             <div id='home_text'>
        //                 <div id='home_title_content'><p>{item.title}</p></div>
        //                 <div id='home_description_content'>Description : {item.description}</div>
        //                 <div id='home_date'>{dateProduct}</div>
        //             </div>
        //             <div id='home_value'>
        //                 <div id='price'>{item.value}</div>
        //             </div>
        //         </div>
        //     </a>
        // </div>
        <div className="card" id='card_content_animation' onClick={DirectContent} >
            <div id='card-head'>
                <img src={TypeProduct} />
            </div>
            <div className="card-body">
                <div id='title_card_content'>
                    <div className="card-title-content">{item.title}</div>
                </div>
                <div id='desc_body_content'>
                    <div className="card-text">Description : {item.description}</div>
                </div>
                <div id='card_footer_content'>
                    <div id='card_time'>
                        <div><CiTimer />
                            {
                                mon ? d ? h ? min ? <div>just now !</div>
                                    : Calculate_Min + "min" // hour
                                    : Calculate_Hour + "h" // day
                                    : Calculate_Day + "d" // month
                                    : Caculate_Month + "mon"
                            }
                        </div>
                    </div>
                    <div id='card_value'>
                        <div>{item.value}</div>
                    </div>
                </div>

            </div>


        </div>
    )
}

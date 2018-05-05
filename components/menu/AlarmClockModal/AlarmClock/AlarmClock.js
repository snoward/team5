import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import { getCalls, registerCall, cancelCall } from '../../../../lib/apiRequests/calls';
import ErrorModal from '../../../errorModal/index';

import 'react-datetime/css/react-datetime.css';
import './styles.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleCloseModal: props.handleCloseModal,
            enteredPhone: '',
            errorMessage: ''
        };

        moment.locale('ru');

        this.yesterday = moment().subtract(1, 'day');

        this.isValidDate = this.isValidDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    componentDidMount() {
        this.setState({ selectedDate: moment() });
        getCalls()
            .then(res => {
                this.setState({ settedAlarmClock: res.data[0] });
            });
    }

    isValidDate(currentDate) {
        return currentDate.isAfter(this.yesterday);
    }

    onDateChange(selectedDate) {
        this.setState({ selectedDate });
    }

    onPhoneChange(event) {
        this.setState({ enteredPhone: event.target.value });
    }

    handleNewAlarmClock(alarmClock) {
        this.setState({ alarmClock });
    }

    handleCloseErrorModal() {
        this.setState({ showErrorModal: false });
    }

    onSubmit(event) {
        event.preventDefault();
        const phoneNumber = this.state.enteredPhone;
        this.state.selectedDate.seconds(0);
        const callTime = new Date(this.state.selectedDate);
        registerCall(phoneNumber, callTime)
            .then(res => {
                if (res.data.error) {
                    this.setState({ showErrorModal: true,
                        errorMessage: res.data.error.message });

                    return;
                }
                this.setState({ settedAlarmClock: res.data });
            });
    }

    onDeleteButtonClick() {
        cancelCall(this.state.settedAlarmClock._id)
            .then(() => this.setState({ settedAlarmClock: null }));
    }

    render() {
        return (
            <section className='alarm-clock'>
                <ErrorModal
                    showModal={this.state.showErrorModal}
                    error={this.state.errorMessage}
                    handleCloseModal={this.handleCloseErrorModal}
                />

                <button
                    className='alarm-clock__close-modal-button'
                    onClick={this.state.handleCloseModal}
                >
                    &#10008;
                </button>

                {this.state.settedAlarmClock
                    ? <article className='alarm-clock__setted-alarm-clock'>
                        <header className='alarm-clock__setted-alarm-clock-header'>
                            У вас есть установленный будильник:
                        </header>
                        <div className='alarm-clock__setted-alarm-info-wrapper'>
                            <div className='alarm-clock__setted-alarm-clock-time'>
                                {moment(this.state.settedAlarmClock.callTime).format('LLL')}
                            </div>
                            <button
                                className='alarm-clock__button'
                                onClick={this.onDeleteButtonClick}
                            >
                                Удалить
                            </button>
                        </div>
                    </article>
                    : <article className='alarm-clock__not-setted-alarm-clock-text'>
                        Вы не установили будильник
                    </article>

                }

                <Datetime
                    className='alarm-clock__datetime'
                    input={false}
                    defaultValue={moment()}
                    isValidDate={this.isValidDate}
                    onChange={this.onDateChange}
                    locale='ru'
                />

                <form
                    className='alarm-clock__bottom-inputs-wrapper'
                    onSubmit={this.onSubmit}
                >
                    <input
                        className='alarm-clock__phone-number-input'
                        type='tel'
                        required
                        pattern='\+7[0-9]{10}'
                        placeholder='+79999999999'
                        onChange={this.onPhoneChange}
                    />
                    <button
                        className="alarm-clock__button"
                    >
                        Установить!
                    </button>
                </form>

            </section>
        );
    }
}

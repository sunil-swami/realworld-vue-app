import moment from 'moment';

export default (date) => {
    return moment(new Date(date)).format('MM/DD/YYYY hh:mm');
};

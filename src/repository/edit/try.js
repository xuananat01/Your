import PropTypes from 'prop-types';
import HTTP from '@configs/HTTP';

export const getInfoLogin = async ({
    userId,
    accessToken,
}) =>
    new Promise((handleSuccess, handleError) => {
        let body = {
            user_id: userId,
            access_token: accessToken,
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        HTTP.post(
            '/endpoint',
            options,
            (res) => {
                if (res.result != undefined && res.result.code == 200) {
                    handleSuccess(res.result.data);
                } else {
                    handleError(res.result.message);
                }
            },
            (err) => {
                handleError(err);
            },
        );
    });

getInfoLogin.propTypes = {
    userId: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
};
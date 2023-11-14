import React, { useState, useMemo, PermissionsAndroid, Linking } from 'react';
// import i18n from 'i18n-js';
import { useDispatch, useSelector } from 'react-redux';
// import NetInfo from "@react-native-community/netinfo";
// import en from '@i18n/en.json';
// import vi from '@i18n/vi.json';
import { LocalizationContext } from './index';
import { AuthenticationProvider } from './Authentication';
import { useEffect } from 'react';
import LoadingIconAnimated from '../components/Loadings/LoadingScreen';
// import { setIsStateNetWork } from '@redux/actions/networkAction';

// i18n.fallbacks = true;
// i18n.translations = { vi, en };

export const LocalizationProvider = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(st => st.conf);
    const [locale, setLocale] = useState('vi');
    // const [isConnectedNetwork, setisConnectedNetwork] = useState(false);
    const localizationContext = useMemo(
        () => ({
            t: (scope, options) => i18n.t(scope, { locale, ...options }),
            locale,
            setLocale,
        }),
        [locale],
    );

    // const handleConnectivityChange = state => {
    //     console.log("Trạng thái kết nối mạng đã thay đổi:", state.isConnected ? "Connected" : "Disconnected");
    //     console.log("Loại kết nối mạng:", state.type);
    //     console.log("Chi tiết kết nối mạng:", state.details);
    // };

    // NetInfo.addEventListener(handleConnectivityChange);

    // useEffect(() => {
    //     NetInfo.addEventListener(state => {
    //         // setisConnectedNetwork(state.isConnected ? false : true);
    //         dispatch(setIsStateNetWork(state.isConnected ? false : true));

    //     });
    // }, []);

    // useEffect(() => {
    //     const checkLocationPermission = async () => {
    //         const permission =
    //             Platform.OS === 'android'
    //                 ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    //                 : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    //         const result = await check(permission);
    //         console.log("resultresultresult====>", result);
    //     };
    //     checkLocationPermission();
    // }, [])

    // useEffect(() => {
    // PermissionStatus.addEventListener(status => {
    //     console.log("statusstatusstatus=======>", status);

    // });
    // Linking.openURL('app-settings:');

    // }, []);
    // if (!isCheckLocalization) {
    //     return false;
    // }
    // console.log(isConnectedNetwork);

    return (
        <LocalizationContext.Provider value={localizationContext}>
            {/* <AuthenticationProvider /> */}
            <LoadingIconAnimated isLoading={isLoading} />
            {/* <CheckConnected visible={isConnectedNetwork}
            /> */}
        </LocalizationContext.Provider>
    );
};

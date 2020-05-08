import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import LinkList from '../components/Link/LinkList';
import SmallHeader from '../components/Header/SmallHeader';
import LargeHeader from '../components/Header/LargeHeader';
// import { attachProps } from '@ionic/react/dist/types/components/utils';

const Trending = (props) => {
    return (
        <IonPage>
            <SmallHeader title="Trending"/>
            <IonContent fullscreen>
                <LargeHeader title="Trending"/>
                <LinkList location={props.location} />
            </IonContent>
        </IonPage>
    );
};

export default Trending;

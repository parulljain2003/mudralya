import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isJoinUsModalOpen, setIsJoinUsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');

    const [modalData, setModalData] = useState({});

    const openJoinUsModal = (plan = '', data = {}) => {
        setSelectedPlan(plan);
        setModalData(data);
        setIsJoinUsModalOpen(true);
    };

    const closeJoinUsModal = () => {
        setIsJoinUsModalOpen(false);
        setSelectedPlan('');
        setModalData({});
    };

    return (
        <ModalContext.Provider
            value={{
                isJoinUsModalOpen,
                selectedPlan,
                modalData,
                openJoinUsModal,
                closeJoinUsModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

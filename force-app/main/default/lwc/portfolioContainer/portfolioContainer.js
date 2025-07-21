/**
 * @name              : 
 * @author            : pchannab
 * @usage             : 
 * @last modified on  : 07-20-2025
 * @last modified by  : pchannab 
 * Modifications Log
 * Ver   Date         Author     Modification
 * 1.0   07-20-2025   pchannab   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import getPortfolioData from '@salesforce/apex/PortfolioController.getPortfolioData';

export default class PortfolioContainer extends LightningElement {
    profile;
    certifications = [];
    workHistories = [];
    education = [];
    error;

    @wire(getPortfolioData)
    wiredPortfolioData({ error, data }) {
        if (data) {
            this.profile = data.profile;
            this.certifications = data.certifications || [];
            this.workHistories = data.workHistories || [];
            this.education = data.education || [];
            this.error = undefined;
        } else if (error) {
            console.error('Error fetching portfolio data:', error);
            this.error = error;
            this.profile = undefined;
            this.certifications = [];
            this.workHistories = [];
            this.education = [];
        }
    }
}
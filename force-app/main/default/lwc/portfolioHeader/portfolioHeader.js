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
import { LightningElement, api } from 'lwc';
export default class PortfolioHeader extends LightningElement {
    @api profile;

    get emailHref() {
        return this.profile && this.profile.My_Email__c ? `mailto:${this.profile.My_Email__c}` : undefined;
    }

    handleEmailClick() {
        if (this.profile && this.profile.My_Email__c) {
            window.open(`mailto:${this.profile.My_Email__c}`);
        }
    }

    handleLinkedInClick() {
        if (this.profile && this.profile.LinkedIn__c) {
            window.open(this.profile.LinkedIn__c, '_blank');
        }
    }

    handleGitHubClick() {
        if (this.profile && this.profile.GitHub__c) {
            window.open(this.profile.GitHub__c, '_blank');
        }
    }
}
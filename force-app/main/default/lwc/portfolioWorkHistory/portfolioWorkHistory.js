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
import { LightningElement, api, track } from 'lwc';
function getYear(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).getFullYear();
}
function getDuration(start, end) {
    if (!start) return '';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    let result = '';
    if (years > 0) result += `${years} yr${years > 1 ? 's' : ''}`;
    if (months > 0) {
        if (result) result += ' ';
        result += `${months} mo${months > 1 ? 's' : ''}`;
    }
    return result || 'Less than 1 mo';
}
export default class PortfolioWorkHistory extends LightningElement {
    @api workHistories = [];
    @track localWorkHistories = [];

    renderedCallback() {
        if (this.workHistories && this.workHistories.length && this.localWorkHistories.length !== this.workHistories.length) {
            this.localWorkHistories = this.workHistories.map((work) => ({
                ...work,
                expanded: false,
                startYear: getYear(work.Start_Date__c),
                endYear: work.End_Date__c ? getYear(work.End_Date__c) : 'Present',
                duration: getDuration(work.Start_Date__c, work.End_Date__c)
            }));
        }
    }

    handleToggle(event) {
        const idx = parseInt(event.currentTarget.dataset.index, 10);
        this.localWorkHistories = this.localWorkHistories.map((work, i) =>
            i === idx ? { ...work, expanded: !work.expanded } : work
        );
    }
}
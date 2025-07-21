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
public with sharing class PortfolioController {
    public class PortfolioDataWrapper {
        @AuraEnabled public Portfolio_Profile__c profile;
        @AuraEnabled public List<Portfolio_Certification__c> certifications;
        @AuraEnabled public List<Portfolio_Work_History__c> workHistories;
        @AuraEnabled public List<Portfolio_Education__c> education;        
    }

    @AuraEnabled(cacheable=true)
    public static PortfolioDataWrapper getPortfolioData() {
        PortfolioDataWrapper result = new PortfolioDataWrapper();

        // Single SOQL query with sub-selects
        List<Portfolio_Profile__c> profiles = [
            SELECT Id, Name, Professional_Title__c, Where_I_work__c, Where_I_live__c, My_Email__c, LinkedIn__c, GitHub__c, What_I_do__c,
                (SELECT Id, Name, Issued__c, Credential_ID__c, Badge_Image__c, Sort_Order__c, Is_Active__c
                 FROM Portfolio_Certifications__r Where Is_Active__c = true
                 ORDER BY Sort_Order__c ASC),
                (SELECT Id, Name, Title__c, Start_Date__c, End_Date__c, Work_Location__c, Work_Summary__c, Sort_Order__c
                 FROM Portfolio_Work_Histories__r
                 ORDER BY Sort_Order__c ASC),
                (SELECT Id, Name, Institution__c, Degree__c
                 FROM Portfolio_Educations__r)                
            FROM Portfolio_Profile__c
            WHERE Is_Active__c = true
            LIMIT 1
        ];

        if (!profiles.isEmpty()) {
            Portfolio_Profile__c profile = profiles[0];
            result.profile = profile;
            result.certifications = profile.Portfolio_Certifications__r;
            result.workHistories = profile.Portfolio_Work_Histories__r;
            result.education = profile.Portfolio_Educations__r;            
        }

        return result;
    }
}
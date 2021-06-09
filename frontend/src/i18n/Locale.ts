export interface Locale {
  locale: string; // !Must not be deleted. Used for providing the locale in the native language

  entityVariables: {
    name: string;
    identifier: string;
    description: string;
    title: string;
    actions: string;
    adminNote: string;
  };
  commonButtons: {
    close: string;
    submit: string;
    showMore: string;
    showLess: string;
    copy: string;
    copied: string;
    yes: string;
    no: string;
  };
  googleSearch: {
    addOwner: string;
    addOwnerText: string;
    addApprover: string;
    addApproverText: string;
    searchPlaceholder: string;
  };
  alerts: {
    approvers: {
      header: string;
      text: string;
    };
    serviceOwners: {
      header: string;
      text: string;
    };
    appOwners: {
      header: string;
      text: string;
    };
  };
  entityNames: {
    single: {
      application: string;
      service: string;
      action: string;
      token: string;
      user: string;
      approver: string;
      owner: string;
    };
    plural: {
      applications: string;
      services: string;
      actions: string;
      tokens: string;
      users: string;
      approvers: string;
      owners: string;
    };
  };
  SelectorTabs: {
    recent: string;
    starred: string;
    all: string;
  };
  applicationScreen: {
    serviceLibrary: {
      searchForService: string;
      amountOfActions: string;
      requested: string;
      requestAccess: string;
      requestAccessExplain: string;
      noActions: string;
    };

    modalHeaders: {
      addOwners: string;
      selectApp: string;
      createNewToken: string;
      serviceLibrary: string;
      tokenStatus: string;
      getJwt: string;
      generateAppSecret: string;
      hereIsYourAppSecret: string;
    };
    buttons: {
      createApp: string;
      toServicePage: string;
      addOwners: string;
      createToken: string;
    };
    tokens: {
      actions: {
        browseServices: string;
        requestReview: string;
        checkStatus: string;
        generateJwt: string;
        requestActions: string;
        details: string;
      };
      infoBoxes: {
        createTokenInfo: string;
        BrowseTokenInfo: string;
        SeeTokenStatusInfo: string;
        GenerateJwtInfo: string;
      };
      appSecret: {
        appSecretPlaceholder: string;
        appSecretWarningBar: string;
        appSecretWarning: string;
        generateSecret: string;
        haveYouSavedAppSecret: string;
      };
    };
  };
  serviceScreen: {
    modalHeaders: {
      selectService: string;
      addOwners: string;
      addAction: string;
    };
    buttons: {
      createNewService: string;
      toAppPage: string;
      addOwners: string;
      createNewAction: string;
    };
    actions: {
      viewApprovers: string;
      viewApproversHeader: string;
      addApprovers: string;
      addApproversHeader: string;
      copyApproversToAnotherAction: string;
      copyApproversHeader: string;
      copyApprovers: string;
    };
    pendingTokens: {
      header: string;
      cardTitle: string;
      reviewToken: string;
      reviewModal: {
        header: string;
        responses: {
          pending: string;
          approved: string;
          rejected: string;
        };
        response: string;
        rejectionReason: string;
      };
    };
  };
  toasts: {
    error: string;
    success: string;
    submitted: string;
    submittedE: string;
    xCreated: string;
    xCreatedE: string;
    xAdded: string;
    xAddedE: string;
    accessRequested: string;
    accessRequestedE: string;
    reviewRequested: string;
    reviewRequestedE: string;
  };

  example: {
    title: string;
    byLine: string;
    dataLine: string;

    actions: {
      addNew: string;
    };
  };
}

const snackbarConsts = {
  user: {
    createOrder: {
      success: 'Pedido feito com sucesso!',
      error: 'Erro ao efetuar o pedido.',
    },
    orders: {
      exclude: {
        success: 'Pedido retirado com sucesso!',
        error: 'Erro ao retirar pedido.',
      },
      itens: {
        edit: {
          success: 'Item alterado com sucesso!',
          error: 'Erro ao alterar item.',
        },
        exclude: {
          success: 'Item retirado com sucesso!',
          error: 'Erro ao retirar item.',
        },
      },
      confirmDelivery: {
        success: 'Entrega confirmada!',
        error: 'Erro ao confirmar entrega.',
      },
    },
    stock: {
      output: {
        create: {
          success: 'Item de saída criado com sucesso!',
          error: 'Erro ao criar item de saída.',
        },
        exclude: {
          success: 'Item de saída retirado com sucesso!',
          error: 'Erro ao retirar item de saída.',
        },
      },
    },
    changePassword: {
      success: 'Senha alterada com sucesso!',
      error: 'Erro ao alterar senha.',
    },
  },
  admin: {
    manageOrders: {
      itens: {
        edit: {
          success: '',
          error: '',
        },
        exclude: {
          success: '',
          error: '',
        },
      },
      invoiceControl: {
        create: {
          success: '',
          error: '',
        },
      },
    },
    invoice: {
      create: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    receivingReports: {
      edit: {
        success: '',
        error: '',
      },
    },
    dispatchReports: {
      edit: {
        success: '',
        error: '',
      },
    },
    category: {
      create: {
        success: '',
        error: '',
      },
      edit: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    measures: {
      create: {
        success: '',
        error: '',
      },
      edit: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    products: {
      create: {
        success: '',
        error: '',
      },
      edit: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    suppliers: {
      create: {
        success: '',
        error: '',
      },
      edit: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    suppliersOrders: {
      create: {
        success: '',
        error: '',
      },
      edit: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
      itens: {
        create: {
          success: '',
          error: '',
        },
        exclude: {
          success: '',
          error: '',
        },
      },
    },
    protocols: {
      create: {
        success: '',
        error: '',
      },
      edit: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
      itens: {
        create: {
          success: '',
          error: '',
        },
        exclude: {
          success: '',
          error: '',
        },
      },
    },
    materialsOrder: {
      create: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    biddingExemption: {
      create: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    accountantReports: {
      create: {
        success: '',
        error: '',
      },
      exclude: {
        success: '',
        error: '',
      },
    },
    stockReports: {
      error: '',
    },
    warehouseReports: {
      error: '',
    },
    sendEmail: {
      success: '',
      error: '',
    },
    changePassword: {
      success: 'Senha alterada com sucesso!',
      error: 'Erro ao alterar senha.',
    },
  },
  close: 'Fechar',
};

export default snackbarConsts;

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
          success: 'Item editado com sucesso!',
          error: 'Erro ao editar item.',
        },
        exclude: {
          success: 'Item retirado com sucesso!',
          error: 'Erro ao editar item.',
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
        success: 'Nota criada com sucesso!',
        error: 'Erro ao criar nota.',
      },
      exclude: {
        success: 'Nota retirada com sucesso!',
        error: 'Erro ao retirar nota.',
      },
    },
    receivingReports: {
      edit: {
        success: 'Guia de entrada editada com sucesso!',
        error: 'Erro ao editar guia de entrada.',
      },
    },
    dispatchReports: {
      edit: {
        success: 'Guia de saída editada com sucesso!',
        error: 'Erro ao editar guia de saída.',
      },
    },
    category: {
      create: {
        success: 'Categoria criada com sucesso!',
        error: 'Erro ao criar categoria.',
      },
      edit: {
        success: 'Categoria editada com sucesso!',
        error: 'Erro ao editar categoria.',
      },
      exclude: {
        success: 'Categoria retirada com sucesso!',
        error: 'Erro ao retirar categoria.',
      },
    },
    measures: {
      create: {
        success: 'Medida criada com sucesso!',
        error: 'Erro ao criar medida.',
      },
      edit: {
        success: 'Medida editada com sucesso!',
        error: 'Erro ao editar medida',
      },
      exclude: {
        success: 'Medida retirada com sucesso!',
        error: 'Erro ao retirar medida.',
      },
    },
    products: {
      create: {
        success: 'Produto criado com sucesso!',
        error: 'Erro ao criar produto.',
      },
      edit: {
        success: 'Produto editado com sucesso!',
        error: 'Erro ao editar produto.',
      },
      exclude: {
        success: 'Produto retirado com sucesso!',
        error: 'Erro ao retirar produto.',
      },
    },
    suppliers: {
      create: {
        success: 'Fornecedor criado com sucesso!',
        error: 'Erro ao criar fornecedor.',
      },
      edit: {
        success: 'Fornecedor editado com sucesso!',
        error: 'Erro ao editar fornecedor.',
      },
      exclude: {
        success: 'Fornecedor retirado com sucesso!',
        error: 'Erro ao retirar fornecedor.',
      },
    },
    suppliersOrders: {
      create: {
        success: 'Pedido do fornecedor criado com sucesso!',
        error: 'Erro ao criar pedido do fornecedor.',
      },
      edit: {
        success: 'Pedido do fornecedor editado com sucesso!',
        error: 'Erro ao editar pedido do fornecedor.',
      },
      exclude: {
        success: 'Pedido do fornecedor retirado com sucesso!',
        error: 'Erro ao retirar item do fornecedor.',
      },
      itens: {
        create: {
          success: 'Item do pedido do fornecedor criado com sucesso!',
          error: 'Erro ao criar item do pedido do fornecedor',
        },
        exclude: {
          success: 'Item do pedido do fornecedor retirado com sucesso!',
          error: 'Erro ao retirar item do pedido do fornecedor.',
        },
      },
    },
    protocols: {
      create: {
        success: 'Ata criada com sucesso!',
        error: 'Erro ao criar ata',
      },
      edit: {
        success: 'Ata editada com sucesso!',
        error: 'Erro ao editar ata.',
      },
      exclude: {
        success: 'Ata retirada com sucesso!',
        error: 'Erro ao retirar ata.',
      },
      itens: {
        create: {
          success: 'Item da ata criada com sucesso!',
          error: 'Erro ao criar item da ata.',
        },
        exclude: {
          success: 'Item da ata retirada com sucesso!',
          error: 'Erro ao retirar item da ata.',
        },
      },
    },
    materialsOrder: {
      create: {
        success: 'Pedido de AF criado com sucesso!',
        error: 'Erro ao criar pedido de AF.',
      },
      exclude: {
        success: 'Pedido de AF retirado com sucesso!',
        error: 'Erro ao retirar pedido de AF.',
      },
    },
    biddingExemption: {
      create: {
        success: 'Dispensa de licitação criada com sucesso!',
        error: 'Erro ao criar dispensa de licitação',
      },
      exclude: {
        success: 'Dispensa de licitação retirada com sucesso!',
        error: 'Erro ao retirar dispensa de licitação.',
      },
    },
    accountantReports: {
      create: {
        success: 'Relatório do contador criado com sucesso!',
        error: 'Erro ao criar relatório do contador.',
      },
      exclude: {
        success: 'Relatório do contador retirada com sucesso!',
        error: 'Erro ao retirar relatório do contador.',
      },
    },
    stockReports: {
      error: 'Erro ao carregar relatório de estoque.',
    },
    warehouseReports: {
      error: 'Erro ao carregar inventário do Almoxarifado.',
    },
    sendEmail: {
      success: 'Email enviado com sucesso!',
      error: 'Erro ao enviar email.',
    },
    changePassword: {
      success: 'Senha alterada com sucesso!',
      error: 'Erro ao alterar senha.',
    },
  },
  login: {
    error: 'Erro ao efetuar login.',
  },
  close: 'Fechar',
};

export default snackbarConsts;

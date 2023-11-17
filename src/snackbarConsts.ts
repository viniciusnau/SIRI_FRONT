const snackbarConsts = {
  user: {
    createOrder: {
      success: 'Pedido feito com sucesso!',
      error: 'Erro ao efetuar o pedido.',
    },
    orders: {
      exclude: {
        success: 'Pedido excluído com sucesso!',
        error: 'Erro ao excluir pedido.',
      },
      itens: {
        edit: {
          success: 'Item alterado com sucesso!',
          error: 'Erro ao alterar item.',
        },
        exclude: {
          success: 'Item excluído com sucesso!',
          error: 'Erro ao excluir item.',
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
          success: 'Item de saída excluído com sucesso!',
          error: 'Erro ao excluir item de saída.',
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
          success: 'Item excluído com sucesso!',
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
        success: 'Nota excluída com sucesso!',
        error: 'Erro ao excluir nota.',
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
        success: 'Categoria excluída com sucesso!',
        error: 'Erro ao excluir categoria.',
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
        success: 'Medida excluída com sucesso!',
        error: 'Erro ao excluir medida.',
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
        success: 'Produto excluído com sucesso!',
        error: 'Erro ao excluir produto.',
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
        success: 'Fornecedor excluído com sucesso!',
        error: 'Erro ao excluir fornecedor.',
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
        success: 'Pedido do fornecedor excluído com sucesso!',
        error: 'Erro ao excluir item do fornecedor.',
      },
      itens: {
        create: {
          success: 'Item do pedido do fornecedor criado com sucesso!',
          error: 'Erro ao criar item do pedido do fornecedor',
        },
        exclude: {
          success: 'Item do pedido do fornecedor excluído com sucesso!',
          error: 'Erro ao excluir item do pedido do fornecedor.',
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
        success: 'Ata excluída com sucesso!',
        error: 'Erro ao excluir ata.',
      },
      itens: {
        create: {
          success: 'Item da ata criado com sucesso!',
          error: 'Erro ao criar item da ata.',
        },
        exclude: {
          success: 'Item da ata excluído com sucesso!',
          error: 'Erro ao excluir item da ata.',
        },
      },
    },
    materialsOrder: {
      create: {
        success: 'Pedido de AF criado com sucesso!',
        error: 'Erro ao criar pedido de AF.',
      },
      exclude: {
        success: 'Pedido de AF excluído com sucesso!',
        error: 'Erro ao excluir pedido de AF.',
      },
    },
    biddingExemption: {
      create: {
        success: 'Dispensa de licitação criada com sucesso!',
        error: 'Erro ao criar dispensa de licitação',
      },
      exclude: {
        success: 'Dispensa de licitação excluída com sucesso!',
        error: 'Erro ao excluir dispensa de licitação.',
      },
    },
    accountantReports: {
      create: {
        success: 'Relatório do contador criado com sucesso!',
        error: 'Erro ao criar relatório do contador.',
      },
      exclude: {
        success: 'Relatório do contador excluído com sucesso!',
        error: 'Erro ao excluir relatório do contador.',
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
      success: 'Acesse o email para continuar com a troca da senha!',
      error: 'Erro!',
    },
  },
  changePassword: {
    success: 'Acesse o email para continuar com a troca da senha!',
    error: 'Erro!',
  },
  login: {
    error: 'Erro ao efetuar login.',
  },
  close: 'Fechar',
};

export default snackbarConsts;

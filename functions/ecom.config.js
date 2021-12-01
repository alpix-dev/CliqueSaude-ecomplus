/* eslint-disable comma-dangle, no-multi-spaces, key-spacing */

/**
 * Edit base E-Com Plus Application object here.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/applications/
 */

const app = {
  app_id: 131722,
  title: 'CliqueSaúde - Agendamentos',
  slug: 'cliquesaude-agendamentos',
  type: 'external',
  state: 'active',
  authentication: true,

  /**
   * Uncomment modules above to work with E-Com Plus Mods API on Storefront.
   * Ref.: https://developers.e-com.plus/modules-api/
   */
  modules: {
    /**
     * Triggered to calculate shipping options, must return values and deadlines.
     * Start editing `routes/ecom/modules/calculate-shipping.js`
     */
    calculate_shipping:   { enabled: true },

    /**
     * Triggered to validate and apply discount value, must return discount and conditions.
     * Start editing `routes/ecom/modules/apply-discount.js`
     */
    // apply_discount:       { enabled: true },

    /**
     * Triggered when listing payments, must return available payment methods.
     * Start editing `routes/ecom/modules/list-payments.js`
     */
    // list_payments:        { enabled: true },

    /**
     * Triggered when order is being closed, must create payment transaction and return info.
     * Start editing `routes/ecom/modules/create-transaction.js`
     */
    // create_transaction:   { enabled: true },
  },

  /**
   * Uncomment only the resources/methods your app may need to consume through Store API.
   */
  auth_scope: {
    'stores/me': [
      'GET'            // Read store info
    ],
    procedures: [
      'POST'           // Create procedures to receive webhooks
    ],
    products: [
      // 'GET',           // Read products with public and private fields
      // 'POST',          // Create products
      // 'PATCH',         // Edit products
      // 'PUT',           // Overwrite products
      // 'DELETE',        // Delete products
    ],
    brands: [
      // 'GET',           // List/read brands with public and private fields
      // 'POST',          // Create brands
      // 'PATCH',         // Edit brands
      // 'PUT',           // Overwrite brands
      // 'DELETE',        // Delete brands
    ],
    categories: [
      // 'GET',           // List/read categories with public and private fields
      // 'POST',          // Create categories
      // 'PATCH',         // Edit categories
      // 'PUT',           // Overwrite categories
      // 'DELETE',        // Delete categories
    ],
    customers: [
      'GET',           // List/read customers
      // 'POST',          // Create customers
      // 'PATCH',         // Edit customers
      // 'PUT',           // Overwrite customers
      // 'DELETE',        // Delete customers
    ],
    orders: [
      'GET',           // List/read orders with public and private fields
      // 'POST',          // Create orders
      // 'PATCH',         // Edit orders
      // 'PUT',           // Overwrite orders
      // 'DELETE',        // Delete orders
    ],
    carts: [
      // 'GET',           // List all carts (no auth needed to read specific cart only)
      // 'POST',          // Create carts
      // 'PATCH',         // Edit carts
      // 'PUT',           // Overwrite carts
      // 'DELETE',        // Delete carts
    ],

    /**
     * Prefer using 'fulfillments' and 'payment_history' subresources to manipulate update order status.
     */
    'orders/fulfillments': [
      //'GET',           // List/read order fulfillment and tracking events
      // 'POST',          // Create fulfillment event with new status
      // 'DELETE',        // Delete fulfillment event
    ],
    'orders/payments_history': [
      // 'GET',           // List/read order payments history events
      // 'POST',          // Create payments history entry with new status
      // 'DELETE',        // Delete payments history entry
    ],

    /**
     * Set above 'quantity' and 'price' subresources if you don't need access for full product document.
     * Stock and price management only.
     */
    'products/quantity': [
      // 'GET',           // Read product available quantity
      // 'PUT',           // Set product stock quantity
    ],
    'products/variations/quantity': [
      // 'GET',           // Read variaton available quantity
      // 'PUT',           // Set variation stock quantity
    ],
    'products/price': [
      // 'GET',           // Read product current sale price
      // 'PUT',           // Set product sale price
    ],
    'products/variations/price': [
      // 'GET',           // Read variation current sale price
      // 'PUT',           // Set variation sale price
    ],

    /**
     * You can also set any other valid resource/subresource combination.
     * Ref.: https://developers.e-com.plus/docs/api/#/store/
     */
  },

  admin_settings: {
      zip: {
          schema: {
              type: "string",
              maxLength: 9,
              pattern: "^[0-9]{5}-?[0-9]{3}$",
              title: "CEP de origem",
              description: "Código postal do remetente ou centro de distribuição"
          },
          hide: true
      },
      services: {
          schema: {
              title: "Serviços de entrega personalizados",
              type: "array",
              maxItems: 50,
              items: {
                  title: "Opção de serviço de entrega",
                  type: "object",
                  required: [
                      service_code
                  ],
                  properties: {
                      label: {
                          type: "string",
                          maxLength: 50,
                          title: "Rótulo",
                          description: "Nome do serviço exibido aos clientes"
                      },
                      carrier: {
                          type: "string",
                          maxLength: 200,
                          title: "Transportadora"
                      },
                      service_code: {
                          type: "string",
                          maxLength: 10,
                          pattern: "^[A-Za-z0-9-_.]+$",
                          title: "Código do serviço"
                      }
                  }
              }
          },
          hide: true
      },
      posting_deadline: {
          schema: {
              title: "Prazo de postagem",
              type: "object",
              required: [
                  days
              ],
              additionalProperties: false,
              properties: {
                  days: {
                      type: "integer",
                      minimum: 0,
                      maximum: 999999,
                      title: "Número de dias",
                      description: "Dias de prazo para postar os produtos após a compra"
                  },
                  working_days: {
                      type: "boolean",
                      default: true,
                      title: "Dias úteis"
                  },
                  after_approval: {
                      type: "boolean",
                      default: true,
                      title: "Após aprovação do pagamento"
                  }
              }
          },
          hide: true
      },
      additional_price: {
          schema: {
              type: "number",
              minimum: -999999,
              maximum: 999999,
              title: "Custo adicional",
              description: "Valor a adicionar (negativo para descontar) em todas as regras de frete personalizado"
          },
          hide: true
      },
      shipping_rules: {
          schema: {
              title: "Regras de envio",
              description: "Valor do frete e previsão de entrega condicionados. Tabela exemplo https://bit.ly/34ZhqVg",
              type: "array",
              maxItems: 1000,
              items: {
                  title: "Regra de envio",
                  type: "object",
                  required: [
                      service_code,
                      delivery_time,
                      total_price
                  ],
                  properties: {
                      service_code: {
                          type: "string",
                          maxLength: 10,
                          pattern: "^[A-Za-z0-9-_.]+$",
                          title: "Código do serviço"
                      },
                      zip_range: {
                          title: "Faixa de CEP atendida",
                          type: "object",
                          required: [
                              min,
                              max
                          ],
                          properties: {
                              min: {
                                  type: "integer",
                                  minimum: 10000,
                                  maximum: 999999999,
                                  title: "CEP inicial"
                              },
                              max: {
                                  type: "integer",
                                  minimum: 10000,
                                  maximum: 999999999,
                                  title: "CEP final"
                              }
                          }
                      },
                      min_amount: {
                          type: "number",
                          minimum: 1,
                          maximum: 999999999,
                          title: "Valor mínimo da compra"
                      },
                      max_cubic_weight: {
                          type: "number",
                          minimum: 0,
                          maximum: 999999,
                          title: "Peso máximo",
                          description: "Peso cúbico (C x L x A / 6.000) máximo em Kg"
                      },
                      delivery_time: {
                          title: "Prazo de entrega",
                          type: "object",
                          required: [
                              days
                          ],
                          additionalProperties: false,
                          properties: {
                              days: {
                                  type: "integer",
                                  minimum: 0,
                                  maximum: 999999,
                                  default: 20,
                                  title: "Prazo de entrega (dias)",
                                  description: "Número de dias estimado para entrega após o despacho"
                              },
                              working_days: {
                                  type: "boolean",
                                  default: true,
                                  title: "Dias úteis",
                                  description: "Se o prazo é calculado em dias úteis"
                              }
                          }
                      },
                      interval: {
                        type: "number",
                        minimum: 1,
                        maximum: 999999999,
                        title: "Intervalo entre agendamentos (Minutos)"
                    },
                      total_price: {
                          type: "number",
                          minimum: 0,
                          maximum: 9999999999,
                          title: "Preço",
                          description: "Valor do frete com possíveis taxas e adicionais fixos"
                      },
                      disable_free_shipping_from: {
                          type: "boolean",
                          default: false,
                          title: "Não informar frete grátis",
                          description: "Desabilita esta regra nas mensagens \"frete grátis a partir\""
                      },
                      excedent_weight_cost: {
                          type: "number",
                          minimum: 0,
                          maximum: 99999999,
                          title: "Custo por peso excedente",
                          description: "Valor adicional variável por Kg (peso cúbico) excedente"
                      },
                      amount_tax: {
                          type: "number",
                          minimum: -100,
                          maximum: 100,
                          title: "Taxa sobre o subtotal",
                          description: "Adicional/desconto percentual sobre o valor subtotal da compra"
                      }
                  }
              }
          },
          hide: true
      }
  }
  
}

/**
 * List of Procedures to be created on each store after app installation.
 * Ref.: https://developers.e-com.plus/docs/api/#/store/procedures/
 */

const procedures = []

/**
 * Uncomment and edit code above to configure `triggers` and receive respective `webhooks`:

const { baseUri } = require('./__env')

procedures.push({
  title: app.title,

  triggers: [
    // Receive notifications when new order is created:
    {
      resource: 'orders',
      action: 'create',
    },

    // Receive notifications when order financial/fulfillment status are set or changed:
    // Obs.: you probably SHOULD NOT enable the orders triggers below and the one above (create) together.
    {
      resource: 'orders',
      field: 'financial_status',
    },
    {
      resource: 'orders',
      field: 'fulfillment_status',
    },

    // Receive notifications when products/variations stock quantity changes:
    {
      resource: 'products',
      field: 'quantity',
    },
    {
      resource: 'products',
      subresource: 'variations',
      field: 'quantity'
    },

    // Receive notifications when cart is edited:
    {
      resource: 'carts',
      action: 'change',
    },

    // Receive notifications when customer is deleted:
    {
      resource: 'customers',
      action: 'delete',
    },

    // Feel free to create custom combinations with any Store API resource, subresource, action and field.
  ],

  webhooks: [
    {
      api: {
        external_api: {
          uri: `${baseUri}/ecom/webhook`
        }
      },
      method: 'POST'
    }
  ]
})

 * You may also edit `routes/ecom/webhook.js` to treat notifications properly.
 */

exports.app = app

exports.procedures = procedures

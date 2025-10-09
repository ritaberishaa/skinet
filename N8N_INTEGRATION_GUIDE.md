# Skinet + n8n Integration Guide

This guide explains how to integrate your Skinet e-commerce application with n8n for powerful workflow automation.

## Overview

n8n is a workflow automation platform that allows you to connect different services and automate business processes. This integration enables you to:

- Monitor product inventory and send alerts
- Automate customer communications
- Process orders automatically
- Integrate with external services (email, Slack, social media)
- Create custom business workflows

## Setup Instructions

### 1. Start the Services

```bash
# Navigate to your project directory
cd /Users/ritaberisha/Desktop/net/skinet

# Start all services (SQL Server, Redis, n8n)
docker-compose up -d

# Check that all services are running
docker-compose ps
```

### 2. Access n8n

- Open your browser and go to: http://localhost:5678
- Complete the initial setup if this is your first time
- Create your admin account

### 3. Start Your API

```bash
# Navigate to the API directory
cd API

# Run the API
dotnet run
```

Your API will be available at:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001

## Available Webhook Endpoints

Your Skinet API now includes the following webhook endpoints for n8n integration:

### Product Webhooks
- `POST /api/webhook/product-created` - Triggered when a new product is added
- `POST /api/webhook/product-updated` - Triggered when a product is updated
- `POST /api/webhook/low-stock-alert` - For inventory monitoring

### Order Webhooks
- `POST /api/webhook/order-placed` - Triggered when an order is placed

### Testing & Custom Webhooks
- `POST /api/webhook/n8n-test` - For testing n8n connectivity
- `POST /api/webhook/custom/{workflowName}` - Generic endpoint for custom workflows

## Pre-built Workflow Examples

We've included three ready-to-use workflow templates in the `n8n-workflows/` directory:

### 1. Product Stock Monitor (`product-stock-monitor.json`)
**Purpose**: Automatically monitors product inventory and sends alerts when stock is low.

**Features**:
- Runs every 6 hours
- Checks all products for low stock (< 10 items)
- Sends webhook to your API
- Sends email alerts to administrators

**Setup**:
1. Import the workflow in n8n
2. Configure email settings
3. Activate the workflow

### 2. New Product Notification (`new-product-notification.json`)
**Purpose**: Automatically promotes new products across multiple channels.

**Features**:
- Webhook trigger for new products
- Sends notifications to marketing team
- Posts to social media (Twitter)
- Sends Slack notifications

**Setup**:
1. Import the workflow in n8n
2. Configure social media credentials
3. Set up Slack webhook URL
4. Configure email settings

### 3. Order Processing Automation (`order-processing-automation.json`)
**Purpose**: Automates the entire order processing workflow.

**Features**:
- Webhook trigger for new orders
- Sends order confirmation emails
- Alerts sales team for high-value orders (>$100)
- Updates inventory automatically

**Setup**:
1. Import the workflow in n8n
2. Configure email settings
3. Activate the workflow

## Importing Workflows

To import these workflows into n8n:

1. Open n8n at http://localhost:5678
2. Click on "Workflows" in the sidebar
3. Click "Import from File"
4. Select one of the JSON files from the `n8n-workflows/` directory
5. Configure any required credentials (email, social media, etc.)
6. Activate the workflow

## Testing the Integration

### Test n8n Connectivity

Use curl to test the webhook endpoints:

```bash
# Test the n8n test endpoint
curl -X POST http://localhost:5000/api/webhook/n8n-test \
  -H "Content-Type: application/json" \
  -d '{"test": "Hello from n8n!", "timestamp": "2024-01-01T12:00:00Z"}'

# Test product creation webhook
curl -X POST http://localhost:5000/api/webhook/product-created \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 123,
    "productName": "Test Product",
    "price": 29.99,
    "brand": "Test Brand",
    "type": "Test Type"
  }'
```

### Test Product API Integration

Create a new product and trigger workflows:

```bash
# Create a new product (this can trigger n8n workflows)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Test Product",
    "description": "A test product for n8n integration",
    "price": 49.99,
    "pictureUrl": "images/products/test.png",
    "type": "Testing",
    "brand": "TestBrand",
    "quantityInStock": 5
  }'
```

## Configuration Options

### Environment Variables

You can customize n8n behavior by modifying the environment variables in `docker-compose.yml`:

- `N8N_HOST`: The hostname for n8n (default: localhost)
- `N8N_PORT`: The port for n8n (default: 5678)
- `WEBHOOK_URL`: Base URL for webhooks
- `N8N_CORS_ORIGIN`: Allowed CORS origins

### API Configuration

The API has been configured to allow CORS requests from n8n. The allowed origins are:
- http://localhost:4200 (Angular client)
- https://localhost:4200 (Angular client HTTPS)
- http://localhost:5678 (n8n)
- https://localhost:5678 (n8n HTTPS)

## Common Use Cases

### 1. Inventory Management
- Monitor stock levels
- Automatic reorder notifications
- Supplier communications
- Low stock alerts

### 2. Customer Communication
- Order confirmations
- Shipping notifications
- Marketing campaigns
- Customer support automation

### 3. Sales & Marketing
- New product announcements
- Social media posting
- Lead nurturing
- Sales team notifications

### 4. Integration with External Services
- Email marketing platforms
- CRM systems
- Accounting software
- Shipping providers

## Troubleshooting

### Common Issues

1. **n8n can't reach the API**
   - Ensure both services are running
   - Check that the API is accessible at http://localhost:5000
   - Verify CORS configuration

2. **Webhook endpoints return 404**
   - Ensure the WebhookController is properly registered
   - Check that the API is running the latest code
   - Verify the endpoint URLs in n8n workflows

3. **Database connection issues**
   - Ensure SQL Server container is running
   - Check connection strings in appsettings.json
   - Verify database migrations have been applied

### Logs and Debugging

Check service logs:
```bash
# View all service logs
docker-compose logs

# View specific service logs
docker-compose logs n8n
docker-compose logs sql
docker-compose logs redis

# View API logs
cd API && dotnet run
```

## Security Considerations

1. **Webhook Security**: Consider implementing webhook signature verification for production
2. **CORS Configuration**: Restrict CORS origins in production environments
3. **API Authentication**: Implement proper authentication for webhook endpoints
4. **n8n Access**: Secure n8n with proper authentication and HTTPS in production

## Next Steps

1. **Customize Workflows**: Modify the provided workflows to match your business needs
2. **Add Authentication**: Implement proper API authentication for production use
3. **Monitoring**: Set up monitoring and alerting for your workflows
4. **Scaling**: Consider using n8n's queue mode for high-volume scenarios
5. **Integration**: Connect with additional services like payment processors, shipping providers, etc.

## Support

For issues specific to:
- **n8n**: Visit [n8n documentation](https://docs.n8n.io/)
- **Skinet API**: Check the API logs and controller implementations
- **Docker**: Verify docker-compose configuration and container status

Happy automating! 🚀

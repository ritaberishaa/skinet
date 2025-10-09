using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;
using System.Text.Json;

namespace API.Controllers;

public class WebhookController(IGenericRepository<Product> productRepo) : BaseApiController
{
    [HttpPost("product-created")]
    public async Task<IActionResult> ProductCreated([FromBody] JsonElement payload)
    {
        try
        {
            // Log the webhook event
            Console.WriteLine($"Product created webhook received: {payload}");
            
            // You can add custom logic here, such as:
            // - Send notifications
            // - Update external systems
            // - Trigger other workflows
            
            return Ok(new { message = "Product created webhook processed successfully", timestamp = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing product created webhook: {ex.Message}");
            return BadRequest(new { error = "Failed to process webhook", details = ex.Message });
        }
    }

    [HttpPost("product-updated")]
    public async Task<IActionResult> ProductUpdated([FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Product updated webhook received: {payload}");
            
            // Extract product ID if available in payload
            if (payload.TryGetProperty("productId", out var productIdElement) && 
                productIdElement.TryGetInt32(out var productId))
            {
                var product = await productRepo.GetByIdAsync(productId);
                if (product != null)
                {
                    // Custom logic for product updates
                    Console.WriteLine($"Processing update for product: {product.Name}");
                }
            }
            
            return Ok(new { message = "Product updated webhook processed successfully", timestamp = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing product updated webhook: {ex.Message}");
            return BadRequest(new { error = "Failed to process webhook", details = ex.Message });
        }
    }

    [HttpPost("order-placed")]
    public async Task<IActionResult> OrderPlaced([FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Order placed webhook received: {payload}");
            
            // Process order-related automation
            // This could trigger:
            // - Email notifications
            // - Inventory updates
            // - Shipping label generation
            // - Customer communication workflows
            
            return Ok(new { message = "Order placed webhook processed successfully", timestamp = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing order placed webhook: {ex.Message}");
            return BadRequest(new { error = "Failed to process webhook", details = ex.Message });
        }
    }

    [HttpPost("low-stock-alert")]
    public async Task<IActionResult> LowStockAlert([FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Low stock alert webhook received: {payload}");
            
            // Handle low stock notifications
            // Could trigger:
            // - Reorder workflows
            // - Supplier notifications
            // - Admin alerts
            
            return Ok(new { message = "Low stock alert webhook processed successfully", timestamp = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing low stock alert webhook: {ex.Message}");
            return BadRequest(new { error = "Failed to process webhook", details = ex.Message });
        }
    }

    [HttpPost("n8n-test")]
    public IActionResult N8nTest([FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"n8n test webhook received: {payload}");
            
            return Ok(new 
            { 
                message = "n8n webhook test successful",
                timestamp = DateTime.UtcNow,
                receivedPayload = payload.ToString()
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing n8n test webhook: {ex.Message}");
            return BadRequest(new { error = "Failed to process test webhook", details = ex.Message });
        }
    }

    // Generic webhook endpoint for custom n8n workflows
    [HttpPost("custom/{workflowName}")]
    public IActionResult CustomWebhook(string workflowName, [FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Custom webhook '{workflowName}' received: {payload}");
            
            // Process custom workflow data
            var response = new
            {
                workflow = workflowName,
                message = $"Custom webhook '{workflowName}' processed successfully",
                timestamp = DateTime.UtcNow,
                payload = payload.ToString()
            };
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing custom webhook '{workflowName}': {ex.Message}");
            return BadRequest(new { error = $"Failed to process custom webhook '{workflowName}'", details = ex.Message });
        }
    }
}

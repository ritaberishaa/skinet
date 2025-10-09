using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Core.Interfaces;
using Core.Entities;

namespace API.Controllers;

public class ProductRequestController(IGenericRepository<Product> productRepo) : BaseApiController
{
    [HttpPost("ai-enhance-product")]
    public async Task<IActionResult> AiEnhanceProduct([FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"AI Enhancement request received: {payload}");
            
            // Extract product details
            var productName = payload.GetProperty("productName").GetString();
            var description = payload.GetProperty("description").GetString();
            var category = payload.GetProperty("category").GetString();
            var priceRange = payload.GetProperty("priceRange").GetString();
            
            // Generate AI-enhanced description (placeholder for actual AI integration)
            var enhancedDescription = GenerateEnhancedDescription(productName, description, category, priceRange);
            
            var response = new
            {
                enhancedDescription = enhancedDescription,
                suggestions = new[] {
                    "Consider adding technical specifications",
                    "Include material information",
                    "Mention target audience",
                    "Add unique selling points"
                },
                marketViability = "High potential based on current market trends",
                estimatedPrice = GetEstimatedPrice(priceRange)
            };
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in AI enhancement: {ex.Message}");
            return BadRequest(new { error = "Failed to enhance product description", details = ex.Message });
        }
    }

    [HttpPost("product-request-submitted")]
    public async Task<IActionResult> ProductRequestSubmitted([FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Product request submitted: {payload}");
            
            // Log the request details
            var productName = payload.GetProperty("productName").GetString();
            var customerEmail = payload.GetProperty("customerEmail").GetString();
            var category = payload.GetProperty("category").GetString();
            
            Console.WriteLine($"New product request: {productName} from {customerEmail} in category {category}");
            
            // Here you would typically:
            // 1. Save to database
            // 2. Send to Google Sheets via n8n
            // 3. Notify admin team
            // 4. Send confirmation email to customer
            
            var response = new
            {
                message = "Product request received successfully",
                requestId = Guid.NewGuid().ToString(),
                status = "pending",
                estimatedReviewTime = "3-5 business days",
                timestamp = DateTime.UtcNow
            };
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing product request: {ex.Message}");
            return BadRequest(new { error = "Failed to process product request", details = ex.Message });
        }
    }

    [HttpPost("admin/approve-request/{requestId}")]
    public async Task<IActionResult> ApproveProductRequest(string requestId, [FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Approving product request: {requestId}");
            
            // Here you would:
            // 1. Update request status to approved
            // 2. Create actual product in the system
            // 3. Notify customer
            // 4. Update Google Sheets
            
            var response = new
            {
                message = "Product request approved and product created",
                requestId = requestId,
                productId = new Random().Next(1000, 9999), // Placeholder
                status = "approved",
                timestamp = DateTime.UtcNow
            };
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error approving product request: {ex.Message}");
            return BadRequest(new { error = "Failed to approve product request", details = ex.Message });
        }
    }

    [HttpPost("admin/reject-request/{requestId}")]
    public async Task<IActionResult> RejectProductRequest(string requestId, [FromBody] JsonElement payload)
    {
        try
        {
            Console.WriteLine($"Rejecting product request: {requestId}");
            
            var reason = payload.TryGetProperty("reason", out var reasonElement) 
                ? reasonElement.GetString() 
                : "Does not meet our current product criteria";
            
            var response = new
            {
                message = "Product request rejected",
                requestId = requestId,
                reason = reason,
                status = "rejected",
                timestamp = DateTime.UtcNow
            };
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error rejecting product request: {ex.Message}");
            return BadRequest(new { error = "Failed to reject product request", details = ex.Message });
        }
    }

    private string GenerateEnhancedDescription(string? productName, string? description, string? category, string? priceRange)
    {
        var categoryEnhancements = new Dictionary<string, string>
        {
            ["boots"] = "engineered for durability and comfort with advanced materials and ergonomic design",
            ["gloves"] = "crafted with precision for optimal grip, protection, and dexterity",
            ["hats"] = "designed with weather-resistant materials and contemporary styling",
            ["boards"] = "built for performance with cutting-edge technology and premium construction",
            ["other"] = "developed with innovative features and superior craftsmanship"
        };

        var priceEnhancements = new Dictionary<string, string>
        {
            ["under-25"] = "offering exceptional value without compromising on quality",
            ["25-50"] = "providing the perfect balance of affordability and premium features",
            ["50-100"] = "delivering professional-grade performance and reliability",
            ["100-200"] = "representing the pinnacle of design and functionality",
            ["over-200"] = "embodying luxury craftsmanship and exclusive materials"
        };

        var categoryDesc = categoryEnhancements.GetValueOrDefault(category ?? "other", "crafted with attention to detail");
        var priceDesc = priceEnhancements.GetValueOrDefault(priceRange ?? "50-100", "offering great value");

        return $"**{productName}** - {description} This premium product is {categoryDesc}, {priceDesc}. " +
               $"Perfect for discerning customers who demand excellence in their gear. Features include modern aesthetics, " +
               $"sustainable materials, and innovative design elements that set it apart from competitors. " +
               $"Ideal for both casual users and professionals seeking reliable, high-performance equipment.";
    }

    private string GetEstimatedPrice(string? priceRange)
    {
        return priceRange switch
        {
            "under-25" => "$15-24",
            "25-50" => "$30-45",
            "50-100" => "$65-85",
            "100-200" => "$120-180",
            "over-200" => "$250-400",
            _ => "$50-100"
        };
    }
}
